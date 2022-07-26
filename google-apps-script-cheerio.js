function covidUpdate() {
  // Scrape current covid cases (scheduled to be performed daily)
  var webURL = 'https://www.worldometers.info/coronavirus/';
  var response = UrlFetchApp.fetch(webURL);
  var $ = Cheerio.load(response.getContentText());
  var itemsOfInterest = $('.maincounter-number').first().text().trim(); // first child, only text

  // Send email using MailApp library
  var emailBody = 'Number of infected: <b>' + itemsOfInterest + '</b>';
  MailApp.sendEmail({
    to: 'me@example.com',
    subject: 'Current coronavirus cases',
    htmlBody: emailBody
  });
}