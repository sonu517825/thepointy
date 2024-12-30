// logger
const Logger = require("../log/logger");
const log = new Logger("cron-job");
log.info("cron job scheduling...");

const cron = require("node-cron");
const nodemailer = require("nodemailer");
const productSchema = require("../schema/product");

// Email Setup using Nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail", // email provider
  auth: {
    user: "sonu.verma@gmail.com", // email
    pass: "Sonu@1234", // password
  },
});

// Function to send email
const sendNotification = (subject, text) => {
  log.info("sending notification...");
  const mailOptions = {
    from: "sonu.verma@gmail.com",
    to: process.env.ADMIN_EMAIL || "admin@gmail.com",
    subject: subject,
    text: text,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      log.error(`Error sending email: ${error.message}`);
    } else {
      log.info(`Email sent: ${info.response}`);
    }
  });
};

// product stock monitoring cron job
const productStockMonitoringCron = async () => {
  try {
    console.log();
    const count = process.env.PRODUCT_STOCK_MONITORING_COUNT || 10;
    log.info("product stock monitoring cron job running started...");
    log.info("checking product stock...");
    const products = await productSchema.find({
      stock: { $lt: count },
      isDeleted: false,
    });
    log.info(`found stock is ${products.length}`);

    if (products.length > 0) {
      const productNames = products.map((product) => product.name).join(", ");
      const message = `The following products have low stock less than ${count}: ${productNames}. Please restock them.`;

      // Send email notification to the admin
      sendNotification("Low Stock Alert", message);
    } else {
      log.info("No products with low stock 10");
    }
  } catch (error) {
    log.error(`Error in stock monitoring job: ${error}`);
  }
};

const int =
  process.env.PRODUCT_STOCK_MONITORING_CRON_INTERVAL || "*/30 * * * * *";

// Cron job to run at given interval
cron.schedule(int, productStockMonitoringCron);

log.info("Stock monitoring cron job scheduled at midnight every day.");
