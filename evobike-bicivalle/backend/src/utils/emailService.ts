import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export class EmailService {
  /**
   * Notificar al admin cuando se confirma un pago
   */
  static async notifyAdminNewOrder(order: any) {
    try {
      const items = order.items
        .map((item: any) => `- ${item.nameSnapshot} x${item.quantity} - $${item.priceSnapshot.toLocaleString('es-CO')}`)
        .join('\n');

      const emailHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #16a34a;">🎉 Nuevo Pedido Confirmado</h2>
          
          <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3>Orden: ${order.orderNumber}</h3>
            <p><strong>Cliente:</strong> ${order.customerName}</p>
            <p><strong>Email:</strong> ${order.email}</p>
            <p><strong>Teléfono:</strong> ${order.phone}</p>
            <p><strong>Ciudad:</strong> ${order.city}</p>
            <p><strong>Dirección:</strong> ${order.address}</p>
            ${order.notes ? `<p><strong>Notas:</strong> ${order.notes}</p>` : ''}
          </div>

          <h4>Productos:</h4>
          <pre style="background: #f9fafb; padding: 15px; border-radius: 4px;">${items}</pre>

          <div style="margin-top: 20px; padding-top: 20px; border-top: 2px solid #e5e7eb;">
            <p><strong>Subtotal:</strong> $${order.subtotal.toLocaleString('es-CO')}</p>
            <p><strong>IVA (19%):</strong> $${order.tax.toLocaleString('es-CO')}</p>
            <p style="font-size: 18px; font-weight: bold; color: #16a34a;">
              <strong>TOTAL:</strong> $${order.total.toLocaleString('es-CO')}
            </p>
          </div>

          <p style="margin-top: 20px;">
            <a href="https://movilibre.co/admin/orders" 
               style="background: #16a34a; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
              Ver en Panel Admin
            </a>
          </p>
        </div>
      `;

      await transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to: process.env.ADMIN_EMAIL,
        subject: `🛒 Nuevo Pedido: ${order.orderNumber} - ${order.customerName}`,
        html: emailHtml,
      });

      console.log(`✅ Email enviado al admin para orden ${order.orderNumber}`);
    } catch (error) {
      console.error('Error enviando email al admin:', error);
    }
  }

  /**
   * Confirmar orden al cliente
   */
  static async sendOrderConfirmation(order: any) {
    try {
      const items = order.items
        .map((item: any) => `- ${item.nameSnapshot} x${item.quantity} - $${item.priceSnapshot.toLocaleString('es-CO')}`)
        .join('\n');

      const emailHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #16a34a; color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="margin: 0;">¡Gracias por tu compra!</h1>
          </div>

          <div style="padding: 30px; background: white; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px;">
            <p>Hola <strong>${order.customerName}</strong>,</p>
            <p>Tu pedido ha sido confirmado y está siendo procesado.</p>

            <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin-top: 0;">Número de Orden: ${order.orderNumber}</h3>
              <p><strong>Estado:</strong> Pagado ✅</p>
            </div>

            <h4>Productos:</h4>
            <pre style="background: #f9fafb; padding: 15px; border-radius: 4px; white-space: pre-wrap;">${items}</pre>

            <div style="margin-top: 20px; padding-top: 20px; border-top: 2px solid #e5e7eb;">
              <p><strong>Subtotal:</strong> $${order.subtotal.toLocaleString('es-CO')}</p>
              <p><strong>IVA (19%):</strong> $${order.tax.toLocaleString('es-CO')}</p>
              <p style="font-size: 20px; font-weight: bold; color: #16a34a;">
                <strong>TOTAL:</strong> $${order.total.toLocaleString('es-CO')}
              </p>
            </div>

            <div style="background: #fef3c7; padding: 15px; border-radius: 6px; margin-top: 20px;">
              <p style="margin: 0;"><strong>📍 Dirección de Entrega:</strong></p>
              <p style="margin: 5px 0 0 0;">${order.address}, ${order.city}</p>
            </div>

            <p style="margin-top: 30px; color: #6b7280;">
              Te notificaremos cuando tu pedido esté listo para envío.
            </p>

            <p style="margin-top: 20px; color: #6b7280; font-size: 12px;">
              Si tienes alguna pregunta, responde a este email o contáctanos por WhatsApp.
            </p>
          </div>
        </div>
      `;

      await transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to: order.email,
        subject: `✅ Pedido Confirmado - ${order.orderNumber}`,
        html: emailHtml,
      });

      console.log(`✅ Email de confirmación enviado a ${order.email}`);
    } catch (error) {
      console.error('Error enviando email al cliente:', error);
    }
  }

  /**
   * Notificar al cliente que su pedido está listo para envío
   */
  static async notifyReadyToShip(order: any) {
    try {
      const emailHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #3b82f6; color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="margin: 0;">📦 Tu pedido está listo</h1>
          </div>

          <div style="padding: 30px; background: white; border: 1px solid #e5e7eb;">
            <p>Hola <strong>${order.customerName}</strong>,</p>
            <p>¡Buenas noticias! Tu pedido <strong>${order.orderNumber}</strong> está listo para ser enviado.</p>

            <div style="background: #dbeafe; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p style="margin: 0;"><strong>📍 Se enviará a:</strong></p>
              <p style="margin: 5px 0 0 0;">${order.address}, ${order.city}</p>
            </div>

            <p>Recibirás otra notificación cuando el pedido esté en camino.</p>
          </div>
        </div>
      `;

      await transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to: order.email,
        subject: `📦 Tu pedido ${order.orderNumber} está listo para envío`,
        html: emailHtml,
      });

      console.log(`✅ Email "listo para envío" enviado a ${order.email}`);
    } catch (error) {
      console.error('Error enviando email:', error);
    }
  }

  /**
   * Notificar al cliente que su pedido fue enviado
   */
  static async notifyShipped(order: any) {
    try {
      const emailHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #8b5cf6; color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="margin: 0;">🚚 Tu pedido está en camino</h1>
          </div>

          <div style="padding: 30px; background: white; border: 1px solid #e5e7eb;">
            <p>Hola <strong>${order.customerName}</strong>,</p>
            <p>Tu pedido <strong>${order.orderNumber}</strong> ha sido enviado y está en camino a tu dirección.</p>

            <div style="background: #ede9fe; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center;">
              <p style="margin: 0; font-size: 18px;"><strong>🚚 En tránsito</strong></p>
              <p style="margin: 10px 0 0 0; color: #6b7280;">Recibirás tu pedido pronto</p>
            </div>

            <p><strong>📍 Dirección de entrega:</strong><br>${order.address}, ${order.city}</p>

            <p style="margin-top: 30px; color: #6b7280;">
              Si tienes alguna pregunta sobre tu pedido, no dudes en contactarnos.
            </p>
          </div>
        </div>
      `;

      await transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to: order.email,
        subject: `🚚 Tu pedido ${order.orderNumber} está en camino`,
        html: emailHtml,
      });

      console.log(`✅ Email "enviado" enviado a ${order.email}`);
    } catch (error) {
      console.error('Error enviando email:', error);
    }
  }

  /**
   * Notificar al admin sobre stock bajo
   */
  static async notifyLowStock(product: any) {
    try {
      const emailHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #eab308; color: white; padding: 20px; border-radius: 8px 8px 0 0;">
            <h2 style="margin: 0;">⚠️ Alerta de Stock Bajo</h2>
          </div>

          <div style="padding: 20px; background: white; border: 1px solid #e5e7eb;">
            <p>El siguiente producto tiene stock bajo:</p>

            <div style="background: #fef3c7; padding: 15px; border-radius: 6px; margin: 20px 0;">
              <h3 style="margin-top: 0;">${product.name}</h3>
              <p><strong>Stock actual:</strong> ${product.inventoryCount} unidades</p>
              <p><strong>Categoría:</strong> ${product.category}</p>
            </div>

            <p style="color: #dc2626; font-weight: bold;">
              ⚠️ Considera reabastecer este producto pronto.
            </p>

            <p style="margin-top: 20px;">
              <a href="https://movilibre.co/admin/inventory" 
                 style="background: #16a34a; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
                Gestionar Inventario
              </a>
            </p>
          </div>
        </div>
      `;

      await transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to: process.env.ADMIN_EMAIL,
        subject: `⚠️ Stock Bajo: ${product.name} - ${product.inventoryCount} unidades`,
        html: emailHtml,
      });

      console.log(`✅ Email de stock bajo enviado al admin para ${product.name}`);
    } catch (error) {
      console.error('Error enviando email de stock bajo:', error);
    }
  }

  /**
   * Test de configuración de email
   */
  static async sendTestEmail() {
    try {
      await transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to: process.env.ADMIN_EMAIL,
        subject: '✅ Configuración de Email - Test',
        html: `
          <div style="font-family: Arial, sans-serif; padding: 20px;">
            <h2 style="color: #16a34a;">✅ Configuración Correcta</h2>
            <p>El sistema de emails de Evobike está funcionando correctamente.</p>
          </div>
        `,
      });

      console.log('✅ Email de prueba enviado exitosamente');
      return true;
    } catch (error) {
      console.error('❌ Error en configuración de email:', error);
      return false;
    }
  }
}