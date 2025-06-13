// import { NodeMailgun } from "ts-mailgun";
// import EmailTemplate from "../models/emailTemplate.model";
// import moment from "moment";


// type mailType = {
//   from?: {
//     email: string;
//     name: string;
//   };
//   to: string;
//   subject: string;
//   text?: string;
//   html: string;
// };

// const sendEmail = async (mailOptions: mailType) => {

//   if(process.env.MAIL_ENEBLE == '0') {
//     return
//   }

//     const mailer = new NodeMailgun();

//     mailer.apiKey =
//       process.env.MAILGUN_API_KEY ||
//       "a28ad6cdc41ed5a18b11f695ad8ec29f-d2cc48bc-1154cc22"; // Set your API key
//     mailer.domain =
//       process.env.MAILGUN_DOMAIN ||
//       "nakamoto.games"; // Set the domain you registered earlier

//     mailer.options = {
//       host: 'api.eu.mailgun.net'
//     };
//     mailer.fromEmail = process.env.MAILFORM || "foo@example.com"; // Set your from email
//     mailer.fromTitle = process.env.MAILFORMNAME || "Nakamoto"; // Set the name you would like to send from

//     mailer.init();

//     const mailData: any = await mailer
//       .send(mailOptions.to, mailOptions.subject, mailOptions.html)
//       .then((result) => console.log("Done", result))
//       .catch((error) => console.log("Error: ", error.message));

//     return mailData;
// };


// const getEmailLayout = async () => {
//   let results = await EmailTemplate.find({ layout: true, is_active: true });

//   let data = {
//     header_layout: "",
//     footer_layout: "",
//   };

//   for (let index = 0; index < results.length; index++) {
//     const element = results[index];

//     if (element.key === "header_layout") {
//       data["header_layout"] = element.content;
//     }

//     if (element.key === "footer_layout") {
//       data["footer_layout"] = element.content;
//     }
//   }

//   return data;
// };

// const emailTemplate = async (content: string) => {
//   const layout = await getEmailLayout();
//   const html : string = layout['header_layout'] + content + layout['footer_layout'];
//   return html;
// };

// const emailTemplateNoneHeader = async (content: string) => {

//   const html : string = content 
 
//   return html;
// };

// const player = [
//   "user_id",
//   "user_email",
//   "user_address",
//   "user_username",
//   "user_code",
// ];

// const mailParameter = (
//   key: string,
//   data: {
//     player?: object;
//     date?: string;
//     date_start?: string;
//     date_on?: string;
//     date_end?: string;
//     due_date?: string;
//     date_left?: number;
//     url_link?: string;
//     url_link_2?: string;
//     text_parameter?: string;
//     installment_type?: string;
//   }
// ) => {
//   const dateNow = moment().format();

//   if (player.includes(key)) {
//     if (data.player === undefined) return "";
//     const kay_data = key.replace("user_", "");
//     return data.player[kay_data];
//   }

//   if (key === "date_now") {
//     return moment().format("Do MMM YYYY");
//   }

//   if (key === "date_on") {
//     if (data.date === undefined) return "";
//     return moment(data.date).format("Do MMM YYYY");
//   }

//   if (key === "date_start") {
//     if (data.date_start === undefined) return "";
//     return moment(data.date).format("DD-MM-YYYY h:mm:ss");
//   }

//   if (key === "date_end") {
//     if (data.date_end === undefined) return "";
//     return moment(data.date_end).format("DD-MM-YYYY h:mm:ss");
//   }

//   if (key === "due_date") {
//     if (data.due_date === undefined) return "";
//     return moment(data.due_date).format("Do MMM YYYY");
//   }

//   if (key === "date_left") {
//     if (data.date === undefined) return "";
//     return data.date_left;
//   }

//   if (key === "url_frontend") {
//     return process.env.FRONTEND_URL;
//   }

//   if (key === "url_link") {
//     if (data.url_link === undefined) return "";
//     return data.url_link;
//   }

//   if (key === "url_link_2") {
//     if (data.url_link_2 === undefined) return "";
//     return data.url_link_2;
//   }

//   if (key === "text_parameter") {
//     if (data.text_parameter === undefined) return "";
//     return data.text_parameter;
//   }

//   if (key === "installment_type") {
//     if (data.installment_type === undefined) return "";
//     return data.installment_type;
//   }

// };


// export { sendEmail, emailTemplate, emailTemplateNoneHeader, mailParameter };