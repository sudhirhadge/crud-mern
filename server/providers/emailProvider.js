/**
 * Email Provider Abstraction
 * 
 * Architectural Decision:
 * - Strategy pattern for email providers (Nodemailer, SendGrid, Resend, etc.)
 * - Allows easy swapping of email providers without changing business logic
 * - Interface defines standard methods for all providers
 */
class EmailProvider {
    /**
     * Send personalized session email
     * @param {Object} options
     * @param {string} options.to - Recipient email
     * @param {string} options.email - User email
     * @param {string} options.productSku - Product SKU
     * @param {string} options.personalizationLink - Deep link to personalization page
     * @returns {Promise<Object>} - Email delivery result
     */
    async sendPersonalizationEmail(options) {
        throw new Error('EmailProvider.sendPersonalizationEmail must be implemented');
    }
}

/**
 * Nodemailer Implementation (for development)
 * Uses SMTP for sending emails
 */
const nodemailer = require('nodemailer');
const config = require('../config');

class NodemailerEmailProvider extends EmailProvider {
    constructor() {
        super();

        // Create reusable transporter
        this.transporter = nodemailer.createTransport({
            host: config.email.host,
            port: config.email.port,
            secure: config.email.secure,
            auth: config.email.user && config.email.password ? {
                user: config.email.user,
                pass: config.email.password,
            } : undefined,
        });

        // Verify transporter configuration (only in development)
        if (config.nodeEnv === 'development') {
            this.transporter.verify((error, success) => {
                if (error) {
                    console.warn('Email transporter verification failed (this is OK in dev):', error.message);
                    console.warn('Email functionality will be disabled until SMTP is configured');
                } else {
                    console.log('Email transporter is ready to send emails');
                }
            });
        }
    }

    /**
     * Send personalization session email
     */
    async sendPersonalizationEmail({ to, email, productSku, personalizationLink }) {
        const mailOptions = {
            from: config.email.from,
            to,
            subject: `Your AI Personalization Session for ${productSku}`,
            html: this._buildEmailHtml(email, productSku, personalizationLink),
        };

        const result = await this.transporter.sendMail(mailOptions);

        return {
            success: true,
            messageId: result.messageId,
            accepted: result.accepted,
        };
    }

    /**
     * Build email HTML content
     */
    _buildEmailHtml(email, productSku, link) {
        return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .button { display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; font-weight: bold; }
          .footer { text-align: center; margin-top: 20px; color: #888; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎨 Your AI Personalization is Ready!</h1>
          </div>
          <div class="content">
            <p>Hello ${email},</p>
            <p>Your personalization session for <strong>${productSku}</strong> has been created successfully!</p>
            <p>Click the button below to personalize your product now:</p>
            <p style="text-align: center;">
              <a href="${link}" class="button">Personalize Now</a>
            </p>
            <p>Or copy and paste this link into your browser:</p>
            <p style="word-break: break-all; color: #667eea;">${link}</p>
            <p><strong>Important:</strong> This link will expire in 7 days.</p>
            <div class="footer">
              <p>This is an automated message from AI Personalization Service</p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;
    }
}

module.exports = {
    EmailProvider,
    NodemailerEmailProvider,
}; 