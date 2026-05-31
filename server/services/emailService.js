/**
 * Email Service
 * Business logic for sending emails
 * 
 * Architectural Decision:
 * - ALWAYS send emails in both dev and production
 * - Development uses Ethereal Email (fake SMTP for testing)
 * - Production uses real email provider
 * - Email failures are logged but don't block session creation
 * - This ensures consistent behavior across environments
 */
const { getEmailProvider } = require('../providers');
const config = require('../config');

class EmailService {
    /**
     * Send personalization session email
     * ALWAYS attempts to send email (dev and production)
     * @param {Object} session - Session object
     * @returns {Promise<Object>} Email delivery result
     */
    async sendPersonalizationEmail(session) {
        const emailProvider = getEmailProvider();

        const emailData = {
            to: session.email,
            email: session.email,
            productSku: session.productSku,
            personalizationLink: session.personalizationLink,
        };

        try {
            const result = await emailProvider.sendPersonalizationEmail(emailData);

            // Log success (helpful for debugging)
            if (config.nodeEnv === 'development') {
                console.log('\n' + '='.repeat(60));
                console.log('📧 EMAIL SENT SUCCESSFULLY');
                console.log('='.repeat(60));
                console.log(`To: ${session.email}`);
                console.log(`Product SKU: ${session.productSku}`);
                console.log(`\n✨ PERSONALIZATION LINK (also in email):`);
                console.log(`🔗 ${session.personalizationLink}`);
                console.log(`\n📨 Email Message ID: ${result.messageId}`);
                if (config.email.host === 'smtp.ethereal.email') {
                    console.log(`\n🔍 Check Ethereal inbox: https://ethereal.email/messages`);
                }
                console.log('='.repeat(60) + '\n');
            }

            return result;
        } catch (error) {
            // Log error but don't block session creation
            console.error('\n' + '⚠️'.repeat(30));
            console.error('❌ EMAIL SENDING FAILED');
            console.error('⚠️'.repeat(30));
            console.error(`To: ${session.email}`);
            console.error(`Error: ${error.message}`);
            console.error('\n💡 TIP: Check your EMAIL configuration in .env');
            console.error('💡 For testing, use Ethereal Email: https://ethereal.email');
            console.error('⚠️'.repeat(30) + '\n');

            // In development, still return success so session creation works
            // but email didn't actually send
            if (config.nodeEnv === 'development') {
                return {
                    success: false,
                    error: error.message,
                    warning: 'Email failed but session was created. Check console for link.',
                };
            }

            // In production, return failure
            return {
                success: false,
                error: error.message,
            };
        }
    }
}

module.exports = new EmailService();