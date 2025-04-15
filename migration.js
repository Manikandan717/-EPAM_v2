// Sample data migration script for transforming sentence data

function migrateData(inputData) {
    // Initialize the result object to store sentences by language
    const result = {};
    
    // Process each sentence in the input data
    for (const item of inputData) {
      // Extract the language code
      const language = item.language;
      
      // Create an entry for this language if it doesn't exist yet
      if (!result[language]) {
        result[language] = [];
      }
      
      // Add the sentence with only id and text properties
      result[language].push({
        id: item.sentenceUid,
        text: item.text
      });
    }
    
    return result;
  }
  
  // Example input data from the provided sample
  const inputData = [
    {
    "sentenceUid": "b68d9db616b6025844b097d48fc800a7",
    "text": "Mogu li vidjeti neobrađene uplate?",
    "language": "hr-BA",
    "englishText": "Can I view pending deposits?"
  },
  {
    "sentenceUid": "b8ec5eb6c336ddce392be1c12aa13c66",
    "text": "Kako mogu uraditi reprogram kredita?",
    "language": "hr-BA",
    "englishText": "How can I refinance my loan?"
  },
  {
    "sentenceUid": "d5667352509fb4fecc7dd31cb5b7210f",
    "text": "Potrebna mi je pomoć oko prenosa novca?",
    "language": "hr-BA",
    "englishText": "I need help with my transfer."
  },
  {
    "sentenceUid": "70ad926cfa7ac739c8f3544b32d11950",
    "text": "Koliko imam štednje na računu?",
    "language": "hr-BA",
    "englishText": "How much do I have in my savings account?"
  },
  {
    "sentenceUid": "ff57d5a6c7c000b94ef8ea69d94fed7c",
    "text": "Aktiviraj Apple Pay za moju Visa karticu.",
    "language": "hr-BA",
    "englishText": "Activate Apple Pay for my Visa card."
  },
  {
    "sentenceUid": "d27597ce52610643000d422dc141b240",
    "text": "Mogu li ažurirati svoja sigurnosna pitanja?",
    "language": "hr-BA",
    "englishText": "Can I update my security questions?"
  },
  {
    "sentenceUid": "5b40278b7759abc6b95e6227ae1908c3",
    "text": "Kako omogućiti mobilna obavještenja za transakcije?",
    "language": "hr-BA",
    "englishText": "How do I enable mobile alerts for transactions?"
  },
  {
    "sentenceUid": "1b1e80685136c31dac30cb1b79f67c05",
    "text": "Koji je moj IBAN?",
    "language": "hr-BA",
    "englishText": "What is my IBAN?"
  },
  {
    "sentenceUid": "bb5a20019c2068bc808b17fe8e6d4afe",
    "text": "Šta treba od dokumentacije za zahtjev za kredit?",
    "language": "hr-BA",
    "englishText": "What documents do I need to apply for a loan?"
  },
  {
    "sentenceUid": "3634e9161a570edf7aab3eb8bf0d360b",
    "text": "Koliko je stanje na mojem računu 15. sječnja 2023?",
    "language": "hr-BA",
    "englishText": "What was my account balance on January 15, 2023?"
  },
  {
    "sentenceUid": "84389e0cd8686fcea09f87b5b33052ea",
    "text": "Kako mogu tražiti novi karticu?",
    "language": "hr-BA",
    "englishText": "How can I request a new card?"
  },
  {
    "sentenceUid": "c37963efb304474fe34054aadb8e0659",
    "text": "Mogu li predati zahtjev za kredit online?",
    "language": "hr-BA",
    "englishText": "Can I apply for a personal loan online?"
  },
  {
    "sentenceUid": "167b176898e45feb5c819c0198b8a57f",
    "text": "Omogućite dvofaktorsku autentifikaciju?",
    "language": "hr-BA",
    "englishText": "Enable two-factor authentication."
  },
  {
    "sentenceUid": "19e5ddcadd9b0c40aeab7f005dc56bdc",
    "text": "Koliki je moj povrat ulaganja?",
    "language": "hr-BA",
    "englishText": "What are my investment returns?"
  },
  {
    "sentenceUid": "ce89d21f1d3696244a6bc447f49f401a",
    "text": "Mogu li promijeniti rok kredita?",
    "language": "hr-BA",
    "englishText": "Can I change my loan term?"
  },
  {
    "sentenceUid": "f711fa497c9d052e998da1bb62466359",
    "text": "Koji je maksimalni iznos prenosa novca koji mogu uraditi?",
    "language": "hr-BA",
    "englishText": "What is the maximum transfer limit?"
  },
  {
    "sentenceUid": "ca50a2601925e06f563370066c5e6202",
    "text": "Koji plan štednje je najbolji za mene?",
    "language": "hr-BA",
    "englishText": "What is the best savings plan for me?"
  },
  {
    "sentenceUid": "6d60b9597d995d4010ca88d328ea754e",
    "text": "Možete li danas prebaciti 500KM s mog tekućeg računa na štedni račun?",
    "language": "hr-BA",
    "englishText": "Can you transfer €500 from my checking account to my savings account today?"
  },
  {
    "sentenceUid": "a19e1e65dd7b99591a6b2e34e554708f",
    "text": "Šta je nadolazeće za plaćanje?",
    "language": "hr-BA",
    "englishText": "Show me my upcoming scheduled payments."
  },
  {
    "sentenceUid": "aa4d0d7dc825cdbfd15deef3cc177a95",
    "text": "Mogu li zakazati sastanak s financijskim savjetnikom?",
    "language": "hr-BA",
    "englishText": "Can I schedule a meeting with a financial advisor?"
  },
  {
    "sentenceUid": "80687d21cdb599244cf47e68dd685ed2",
    "text": "Mogu li zatražiti privremeni porast limita kreditne kartice?",
    "language": "hr-BA",
    "englishText": "Can I request a temporary increase in my credit limit?"
  },
  {
    "sentenceUid": "7f86558abf7f22126d87d66911e0a2cc",
    "text": "Mogu li otvoriti novi račun za štednju?",
    "language": "hr-BA",
    "englishText": "Can I open a new savings account?"
  },
  {
    "sentenceUid": "eb5b065852cb5d0e4a015bacc60bef4f",
    "text": "Kako postaviti sigurnosne alarme?",
    "language": "hr-BA",
    "englishText": "How can I set up security alerts?"
  },
  {
    "sentenceUid": "efb71f61245260bbbefa319b569a3633",
    "text": "Trajnim nalogom plaćaj stanarinu.",
    "language": "hr-BA",
    "englishText": "Set up a standing order for my rent."
  },
  {
    "sentenceUid": "04e9a99b0604564aec8375c6bcd813b6",
    "text": "Kako zaustaviti ponavljajuće plaćanje?",
    "language": "hr-BA",
    "englishText": "How do I stop a recurring payment?"
  },
  {
    "sentenceUid": "244b7a248935f4099a2e8214d21dad1c",
    "text": "Mogu li promjeniti naziv računa?",
    "language": "hr-BA",
    "englishText": "Can I rename my accounts?"
  },
  {
    "sentenceUid": "ece0e6dffcc7f0836e00ee76907365dd",
    "text": "Mogu li izvršiti dodatnu uplatu rate kredita?",
    "language": "hr-BA",
    "englishText": "Can I make an extra payment on my loan?"
  },
  {
    "sentenceUid": "394c5b57c52b0f9aaf8a44fe6cb0dd2a",
    "text": "Molimo Vas da zakažete plaćanje računa od 400KM mojem stanodavcu na adresu Hercegovačka 123, Mostar, Bosna i Hercegovina, studeni 2023. godine.",
    "language": "hr-BA",
    "englishText": "Please schedule a bill payment of £200 to my landlord at Hauptstr. 123, Berlin, on November 5, 2023."
  },
  {
    "sentenceUid": "6f16b3280ceaa2d68ca45b8f8a4463ed",
    "text": "Koliko mogu pozajmiti?",
    "language": "hr-BA",
    "englishText": "How much can I borrow?"
  },
  {
    "sentenceUid": "1189ef4fdefa9b7a121c98291207bde4",
    "text": "Kada mi je kreditirana posljednja plaća?",
    "language": "hr-BA",
    "englishText": "When was my last salary credited?"
  },
  {
    "sentenceUid": "ab3dcf0ed8efd019c1dbc2eae26a46f0",
    "text": "Kolika je kamatna stopa mog kredita?",
    "language": "hr-BA",
    "englishText": "What is the interest rate on my loan?"
  },
  {
    "sentenceUid": "a9ce470e30afe9c58a7523ae20e899cc",
    "text": "Kako se mogu prijaviti za elektronskeizvode?",
    "language": "hr-BA",
    "englishText": "How do I enroll in paperless statements?"
  },
  {
    "sentenceUid": "8d83f534c5ce8d91f785d141e2cd8b13",
    "text": "Kako da ažuriram moje kontaktne podatke?",
    "language": "hr-BA",
    "englishText": "How do I update my contact information?"
  },
  {
    "sentenceUid": "b13f15d71cfba47b1607f9e566ce3153",
    "text": "Kako da postavim na svom računu limit potrošnje?",
    "language": "hr-BA",
    "englishText": "How do I set a spending limit on my account?"
  },
  {
    "sentenceUid": "2561bc0a4bafebece7880abd3e30c528",
    "text": "Mogu li karticom plaćati u inozemstvu?",
    "language": "hr-BA",
    "englishText": "Is my card enabled for international payments?"
  },
  {
    "sentenceUid": "eabaa9a583830394c53495a5f53fdc88",
    "text": "Kako promjeniti email adresu za moj račun?",
    "language": "hr-BA",
    "englishText": "How do I change my account's primary email address?"
  },
  {
    "sentenceUid": "8e5a6c2feae695fb5d2fef9a21129114",
    "text": "Pokažite mi moje nedavne transakcije?",
    "language": "hr-BA",
    "englishText": "Show me my recent card transactions."
  },
  {
    "sentenceUid": "bcdb070a6302b29484186b6dec8dd91b",
    "text": "Koliko sam potrošio na namirnice prošlog mjeseca?",
    "language": "hr-BA",
    "englishText": "How much did I spend on groceries last month?"
  },
  {
    "sentenceUid": "72db77254754b7250a156f32073167d6",
    "text": "Kako se može tražiti povrat novca?",
    "language": "hr-BA",
    "englishText": "What cashback offers do I have?"
  },
  {
    "sentenceUid": "13ebf7fb2e5466c1e29d20f5095a712c",
    "text": "Mogu li automatizovari mjesečnu štednju?",
    "language": "hr-BA",
    "englishText": "Can I automate monthly savings?"
  },
  {
    "sentenceUid": "4aea8fecf7bd1c7f65aa81225e151725",
    "text": "Blokirajte moju kreditnu karticu.",
    "language": "hr-BA",
    "englishText": "Block my credit card."
  },
  {
    "sentenceUid": "fc72bb2c06904680139e00843f711b1d",
    "text": "Mogu li vidjeti pokušaje prijave?",
    "language": "hr-BA",
    "englishText": "Can I see login attempts?"
  },
  {
    "sentenceUid": "45932f2a27ce9b9127a103085578057b",
    "text": "Možete li mi poslati izvode sa računa od lipnja 2022. do rujna 2022. na moju email adresu?",
    "language": "hr-BA",
    "englishText": "Can you send me my bank statements from June 2022 to September 2022 to my email address?"
  },
  {
    "sentenceUid": "19f4f4c7a6be070d995eaa4f5056d576",
    "text": "Možete li me savjetovati kako da uštedim više novca?",
    "language": "hr-BA",
    "englishText": "Can you suggest ways to save more money?"
  },
  {
    "sentenceUid": "b9efc984aabbcccdabb13510c9964bdd",
    "text": "Postoje li sumnjive aktivnosti na mojemu računu?",
    "language": "hr-BA",
    "englishText": "Are there any suspicious activities on my account?"
  },
  {
    "sentenceUid": "8a66050c9e938b240b7f7d5803cd945b",
    "text": "Mogu li promijeniti PIN kartice?",
    "language": "hr-BA",
    "englishText": "Can I change my card PIN?"
  },
  {
    "sentenceUid": "34018debb73ef46e414b49361f346b64",
    "text": "Mogu li naručiti novu čekovnu knjižicu?",
    "language": "hr-BA",
    "englishText": "Can I order a new checkbook?"
  },
  {
    "sentenceUid": "373fe0fd222acaec6a3d79819be2f700",
    "text": "Kako obaviti plaćanje u realnom vremenu?",
    "language": "hr-BA",
    "englishText": "How do I make a real-time payment?"
  },
  {
    "sentenceUid": "e9d3f2dda2cbd4d5c763fdc57b413e12",
    "text": "Možete li izlistati moje račune?",
    "language": "hr-BA",
    "englishText": "Can you list all my accounts?"
  },
  {
    "sentenceUid": "0c34bbfafed4d814b02f3a31920c0e7d",
    "text": "Mogu li dobiti kopiju izvještaja za moj kredit?",
    "language": "hr-BA",
    "englishText": "Can I get a copy of my credit report?"
  },
  {
    "sentenceUid": "80caa4fcc2bd740969b671a77dad000b",
    "text": "Koje su naknade za transakcije stranih valuta?",
    "language": "hr-BA",
    "englishText": "What are the fees for foreign transactions?"
  },
  {
    "sentenceUid": "3ba54a12efabacb4fea7470dd3efb664",
    "text": "Do kada radi banka?",
    "language": "hr-BA",
    "englishText": "What are the bank’s working hours?"
  },
  {
    "sentenceUid": "89c9c1a981fd072a23a2e15d3bba5bad",
    "text": "Kako mogu promjeniti adresu e-pošte koju koristim za račun?",
    "language": "hr-BA",
    "englishText": "How do I change my email used for account recovery?"
  },
  {
    "sentenceUid": "62d8aabf3957a0c14f4dd169d278f51c",
    "text": "Kolika je kamata za štednju?",
    "language": "hr-BA",
    "englishText": "What are the interest rates for savings accounts?"
  },
  {
    "sentenceUid": "b69ae17d08534c7ac82f601a858000c4",
    "text": "Kako mogu povećati limit na kartici?",
    "language": "hr-BA",
    "englishText": "Can I increase my card limit?"
  },
  {
    "sentenceUid": "482574ee63ccc36e94c597d40447c2d8",
    "text": "Kako postaviti direktno plaćanje?",
    "language": "hr-BA",
    "englishText": "How do I set up direct deposit?"
  },
  {
    "sentenceUid": "b528585cf9388c8e7e1512a0d0b2828e",
    "text": "Možete li mi dati detalje o transakciji od 150KM na adresi Primorska 15, Grude, 12. kolovoza 2023?",
    "language": "hr-BA",
    "englishText": "Can you give me the details of the $150 transaction at Linienstr. 106, Essen on August 12, 2023?"
  },
  {
    "sentenceUid": "278cb0ff8c4d8425cf0bf0fa9f09a3c6",
    "text": "Možete li mi dati informacije o vašim najnovijim ponudama?",
    "language": "hr-BA",
    "englishText": "Can you provide information on your latest offers?"
  },
  {
    "sentenceUid": "feb00831fd469a7e04cc581e437cabf3",
    "text": "Kako prijeći na isključivo online izvode?",
    "language": "hr-BA",
    "englishText": "How do I switch to online-only statements?"
  },
  {
    "sentenceUid": "658910b1d3cd8645ab2ff9db5de48f9a",
    "text": "Kako zatvoriti račun kreditne kartice?",
    "language": "hr-BA",
    "englishText": "How do I close a credit card account?"
  },
  {
    "sentenceUid": "77cd9d93e6a973d6ecebe84f39a37ba2",
    "text": "Koje prednosti imam sa kreditnom karticom na putovanju?",
    "language": "hr-BA",
    "englishText": "What travel benefits come with my credit card?"
  },
  {
    "sentenceUid": "d747eaaee71472252ca6afcdeae4b587",
    "text": "Kako deaktivirati uređaj?",
    "language": "hr-BA",
    "englishText": "How do I deactivate a device?"
  },
  {
    "sentenceUid": "701570433ac8afe32402e4adfc21e58d",
    "text": "Kad će mi sljedeći mjesec skinuti sa računa za Netflix?",
    "language": "hr-BA",
    "englishText": "When will my next direct debit for Netflix be deducted?"
  },
  {
    "sentenceUid": "1861ed3939fd6a66fd6d173fc902680c",
    "text": "Što da radim ako sumnjam na prevaru?",
    "language": "hr-BA",
    "englishText": "What should I do if I suspect fraud?"
  },
  {
    "sentenceUid": "1eeaaa88c8e6dda2c7e01a69282ef68e",
    "text": "Mogu li generirati virtualnu karticu?",
    "language": "hr-BA",
    "englishText": "Can I generate a virtual card?"
  },
  {
    "sentenceUid": "8260d4d6a0c3bb8df47ee619bd35310a",
    "text": "Kako mogu podnijeti zahtjev za hipoteku?",
    "language": "hr-BA",
    "englishText": "How do I apply for a mortgage?"
  },
  {
    "sentenceUid": "d384760818458797f10aff731efcfb80",
    "text": "Kako resetirati moju lozinku?",
    "language": "hr-BA",
    "englishText": "How can I reset my password?"
  },
  {
    "sentenceUid": "bcce2cb6119bbbb0d2dc84b970e27bcc",
    "text": "Pokaži mi mojih posljednjih deset transakcija.",
    "language": "hr-BA",
    "englishText": "Show me my last ten transactions."
  },
  {
    "sentenceUid": "92c513340ba19ebd3beb3beff5f86abf",
    "text": "Molim Vas da postavite redoviti prijenos od 1000KM na moj račun na adresi Trg Bana Jelačića, Široki Brijeg, prvog u svakom mjesecu.",
    "language": "hr-BA",
    "englishText": "Please set up a recurring transfer of 1000$ to my account at MusterPlatz 1, Dortmund, on the first of every month."
  },
  {
    "sentenceUid": "6cbabd1b46935dabe004374f361e559f",
    "text": "Šta će biti ako ne platim ratu na vrijeme?",
    "language": "hr-BA",
    "englishText": "What happens if I miss a payment?"
  },
  {
    "sentenceUid": "7f9c9c946f259cd4debf91e91ee0d2d5",
    "text": "Koliki je trenutačni tečaj KM u EUR od 1. listopada 2023",
    "language": "hr-BA",
    "englishText": "What is the current exchange rate from USD to EUR as of October 1, 2023?"
  },
  {
    "sentenceUid": "c2850c3720c25482c83f171e7cfbef50",
    "text": "Kako kontaktirati službu za korisnike?",
    "language": "hr-BA",
    "englishText": "How can I contact customer support?"
  },
  {
    "sentenceUid": "9f7bb686f35e5e9a1f409ac290fef860",
    "text": "Kako mogu promjeniti nadimak za moj račun?",
    "language": "hr-BA",
    "englishText": "How do I change my account's nickname?"
  },
  {
    "sentenceUid": "e9b4e710773e503ca636fc2538c4c714",
    "text": "Kako prijaviti izgubljenu karticu?",
    "language": "hr-BA",
    "englishText": "How do I report a lost card?"
  },
  {
    "sentenceUid": "663f4ee41e714a3e994c9b0c7423c7f7",
    "text": "Koliki jebio ukupni iznos naknada koje sam platio u posljednjem tromesečju 2022.?",
    "language": "hr-BA",
    "englishText": "What was the total amount of fees I paid in the last quarter of 2022?"
  },
  {
    "sentenceUid": "f8e25303b5351dab757e19f89c17c636",
    "text": "Mogu li prije vremena podići novac sa depozita?",
    "language": "hr-BA",
    "englishText": "Can I withdraw from my fixed deposit early?"
  },
  {
    "sentenceUid": "3abde69777a1b184031a9d4726c692ba",
    "text": "U kojoj fazi je moj zahtjev?",
    "language": "hr-BA",
    "englishText": "What is the status of my inquiry?"
  },
  {
    "sentenceUid": "71931b80d03e43940518226e600e8c19",
    "text": "Koji su uređaji povezani s mojim računom?",
    "language": "hr-BA",
    "englishText": "What devices are linked to my account?"
  },
  {
    "sentenceUid": "578e35a999d27123d8d5bf579ab286c3",
    "text": "Možete li mi dati bankovne podatke za međunarodni transfer na sljedeći IBAN BH89370400440532013000?",
    "language": "hr-BA",
    "englishText": "Could you provide me with the bank coordinates for an international transfer to the following IBAN: DE89370400440532013000?"
  },
  {
    "sentenceUid": "16ef72bfd22370837cfba231db4e7ac7",
    "text": "Koliko je raspoloživo na računu?",
    "language": "hr-BA",
    "englishText": "What is my available balance?"
  },
  {
    "sentenceUid": "a22b3565c3f416978c1e05ca23b99515",
    "text": "Kolika je sad stopa za 12-mjesečnu potvrdu o depozitu?",
    "language": "hr-BA",
    "englishText": "What is the current rate for a 12-month CD?"
  },
  {
    "sentenceUid": "6d74091cda7febfc0a3c97d88ec4d034",
    "text": "Koje pogodnosti imam sa mojom karticom?",
    "language": "hr-BA",
    "englishText": "What are the benefits of my card?"
  },
  {
    "sentenceUid": "f6a52280ed76f705cea52d052461e518",
    "text": "Pokažite mi moj akcionarni portfolio?",
    "language": "hr-BA",
    "englishText": "Show me my stock portfolio."
  },
  {
    "sentenceUid": "2dd036d2d60e8b09dfc55e7166563210",
    "text": "Da li mogu račun podijeliti sa prijateljima?",
    "language": "hr-BA",
    "englishText": "Can I split a bill with friends?"
  },
  {
    "sentenceUid": "2b76f257aef70babcf357ce1929df8df",
    "text": "Koliki je moj trenutni dug kredita?",
    "language": "hr-BA",
    "englishText": "What is my current loan balance?"
  },
  {
    "sentenceUid": "fd8282b2cd51f395c0090774e2534600",
    "text": "Mogu li dobiti ozvod od mog računa?",
    "language": "hr-BA",
    "englishText": "Can I download my bank statement?"
  },
  {
    "sentenceUid": "c02837e17269353eb1557b039055fe29",
    "text": "Koliko imam na računu?",
    "language": "hr-BA",
    "englishText": "What is my account balance?"
  },
  {
    "sentenceUid": "7129f351e136c3fd6cb344f2e88be137",
    "text": "Mogu li postaviti obavijesti za velike transakcije?",
    "language": "hr-BA",
    "englishText": "Can I set notifications for large transactions?"
  },
  {
    "sentenceUid": "6d926aa7c68ec80b45f219460ffb39e4",
    "text": "Kolika je kamatna stopa na tržištu?",
    "language": "hr-BA",
    "englishText": "What is the interest rate on a money market account?"
  },
  {
    "sentenceUid": "51149befdaa61ea182a782c7bada2907",
    "text": "Mogu li dobiti izvode za prošlu godinu?",
    "language": "hr-BA",
    "englishText": "Can I access my account statements from last year?"
  },
  {
    "sentenceUid": "d1cc39a3409b264cc758246f7b1a9fcd",
    "text": "Mogu li kreditom riješiti se dugova?",
    "language": "hr-BA",
    "englishText": "Can I get a loan to consolidate my debts?"
  },
  {
    "sentenceUid": "d7c110461a1250ce9e0cbdbf6e5d030a",
    "text": "Za koje kredite sam kreditno sposoban?",
    "language": "hr-BA",
    "englishText": "What loan options do I have?"
  },
  {
    "sentenceUid": "bd47aea890f35c125bad129447553667",
    "text": "Mogu li osporiti transakciju na mojoj kreditnoj kartici?",
    "language": "hr-BA",
    "englishText": "Can I dispute a charge on my credit card?"
  },
  {
    "sentenceUid": "5c6d226aa087a5b93e5101cca588734a",
    "text": "Kako mogu ulagati u ETF-ove?",
    "language": "hr-BA",
    "englishText": "How can I invest in ETFs?"
  },
  {
    "sentenceUid": "69480e8b46563cf6c9a98695b08f49e6",
    "text": "Kako podnijeti žalbu?",
    "language": "hr-BA",
    "englishText": "How do I file a complaint?"
  },
  {
    "sentenceUid": "a475dc034586a2b3929faff4f8b6b909",
    "text": "Koliki je minimum za ulagajne?",
    "language": "hr-BA",
    "englishText": "What is the minimum amount to invest?"
  },
  {
    "sentenceUid": "b7e7dc23659c111388f2ff2f2c561f52",
    "text": "Mogu li razgovarati s savjetnikom?",
    "language": "hr-BA",
    "englishText": "Can I chat with an advisor?"
  },
  {
    "sentenceUid": "3c1fcc39bb4d1b7709e240aa3a643695",
    "text": "Koliko sam potrošio sa kartice ovaj mjesec?",
    "language": "hr-BA",
    "englishText": "How much have I spent on my card this month?"
  },
  {
    "sentenceUid": "7f33fc0f06b851c97373b8cfc9b30819",
    "text": "Koliko je moja sljedeća rata kredita?",
    "language": "hr-BA",
    "englishText": "How much is my next loan installment?"
  },
  {
    "sentenceUid": "4fafac823254f20fdf228b23178fd6e8",
    "text": "Kako prijaviti problem s uslugom?",
    "language": "hr-BA",
    "englishText": "How do I report a service issue?"
  }
  ];
  
  // Migrate the data
  const migratedData = migrateData(inputData);
  
  // Output the result
  console.log(JSON.stringify(migratedData, null, 2));