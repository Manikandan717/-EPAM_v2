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
        "sentenceUid": "52fa27266aaeea3be92483500b43b759",
        "text": "Koliko sam potrošio/la na prehrambene proizvode prošlog mjeseca?",
        "language": "sr-ME",
        "englishText": "How much did I spend on groceries last month?"
      },
      {
        "sentenceUid": "287a8ecd700afa4c1a8b3aa565cfec66",
        "text": "Kako da se prijavim za dobijanje elektronskih izvoda?",
        "language": "sr-ME",
        "englishText": "How do I enroll in paperless statements?"
      },
      {
        "sentenceUid": "d57e78d0bdbc7a866532c1319a84648d",
        "text": "Aktivirajte Apple Pay za moju Visa karticu.",
        "language": "sr-ME",
        "englishText": "Activate Apple Pay for my Visa card."
      },
      {
        "sentenceUid": "50ce83ec256ff8d5a60360c5542412e0",
        "text": "Prikažite mi moj portfolio akcija",
        "language": "sr-ME",
        "englishText": "Show me my stock portfolio."
      },
      {
        "sentenceUid": "d921be6717edc703b8e77926289ce7a7",
        "text": "Koliki je maksimalni iznos transfera koji mogu da obavim?",
        "language": "sr-ME",
        "englishText": "What is the maximum transfer limit?"
      },
      {
        "sentenceUid": "c23441a96c2dd63e358fffbf026e24ac",
        "text": "Koji dokumenti su potrebni za podnošenje zahtjeva za kredit?",
        "language": "sr-ME",
        "englishText": "What documents do I need to apply for a loan?"
      },
      {
        "sentenceUid": "2bdeafa3d04dc08d05a3c82338f1125c",
        "text": "Kako da podesim automatsku uplatu?",
        "language": "sr-ME",
        "englishText": "How do I set up direct deposit?"
      },
      {
        "sentenceUid": "af430053f451d0c46ad0a0b839f3fdc5",
        "text": "Koja je moja mjesečna potrošnja na kartici?",
        "language": "sr-ME",
        "englishText": "How much have I spent on my card this month?"
      },
      {
        "sentenceUid": "122748cc03223ac9710d4ec12afb387c",
        "text": "Uključite dvofaktorsku prijavu",
        "language": "sr-ME",
        "englishText": "Enable two-factor authentication."
      },
      {
        "sentenceUid": "d2697e67e4e938cc4336df2b2e64b979",
        "text": "Mogu li preuzeti izvod s računa?",
        "language": "sr-ME",
        "englishText": "Can I download my bank statement?"
      },
      {
        "sentenceUid": "c0d230ddadfecd62adcf74ea899c5bdc",
        "text": "Kolika je visina kamatne stopa mog kredita?",
        "language": "sr-ME",
        "englishText": "What is the interest rate on my loan?"
      },
      {
        "sentenceUid": "f86d9cb76a93e43e9dce5f021b596429",
        "text": "Koje prednosti za putovanje mogu ostvariti sa svojom kreditnom karticom?",
        "language": "sr-ME",
        "englishText": "What travel benefits come with my credit card?"
      },
      {
        "sentenceUid": "8984d2c8bbe60e0e377ea4f28514fba5",
        "text": "Kako da promijenim adresu e-pošte koju koristim za oporavak mojeg naloga?",
        "language": "sr-ME",
        "englishText": "How do I change my email used for account recovery?"
      },
      {
        "sentenceUid": "36faa8ca008800aaf479b9fec1fd6eda",
        "text": "Mogu li otvoriti novi štedni račun?",
        "language": "sr-ME",
        "englishText": "Can I open a new savings account?"
      },
      {
        "sentenceUid": "21db5c70ddfd5bee3b4c64c8173d3ae0",
        "text": "Pokažite mi mojih posljednjih deset transakcija.",
        "language": "sr-ME",
        "englishText": "Show me my last ten transactions."
      },
      {
        "sentenceUid": "bbd19a366052fd94b38617b5e86005a0",
        "text": "Kako da podesim bezbjednosne alrame obaveštenja?",
        "language": "sr-ME",
        "englishText": "How can I set up security alerts?"
      },
      {
        "sentenceUid": "bb01303d729218a9b59449216fbd168d",
        "text": "Kako da uključim obavještenja za transakcije na mobilnom telefonu",
        "language": "sr-ME",
        "englishText": "How do I enable mobile alerts for transactions?"
      },
      {
        "sentenceUid": "eb1e4769038265988274601473f72314",
        "text": "Koji je najbolji štedni plan za mene?",
        "language": "sr-ME",
        "englishText": "What is the best savings plan for me?"
      },
      {
        "sentenceUid": "13bade9449bb3d9d3a076bc9cecee633",
        "text": "Kako da zatražim privremeno povećanje limita na kartici?",
        "language": "sr-ME",
        "englishText": "Can I request a temporary increase in my credit limit?"
      },
      {
        "sentenceUid": "e81ca3bf8b558ef3ef9175543f154d42",
        "text": "Kolika je kamatna stopa na računu tržišta novca?",
        "language": "sr-ME",
        "englishText": "What is the interest rate on a money market account?"
      },
      {
        "sentenceUid": "76f244383837ff8d4b61b9cd6d9cc156",
        "text": "Pokažite mi nedavne kartične transakcije.",
        "language": "sr-ME",
        "englishText": "Show me my recent card transactions."
      },
      {
        "sentenceUid": "ab922ae2dbb1fcaedc47b8be8c9737cc",
        "text": "Koliki su moji prihodi od ulaganja?",
        "language": "sr-ME",
        "englishText": "What are my investment returns?"
      },
      {
        "sentenceUid": "4bba251eb94e382ab561554ff5c74edc",
        "text": "Mogu li promjeniti rok otplate mog kredita?",
        "language": "sr-ME",
        "englishText": "Can I change my loan term?"
      },
      {
        "sentenceUid": "1b47e272516d0cf7c48eb2f2fb780347",
        "text": "Šta da uradim ako posumnjam na prevaru?",
        "language": "sr-ME",
        "englishText": "What should I do if I suspect fraud?"
      },
      {
        "sentenceUid": "51539e6662f94f0d26265f0c2ace920a",
        "text": "Mogu li dobiti kredit za konsolidaciju svojih dugova?",
        "language": "sr-ME",
        "englishText": "Can I get a loan to consolidate my debts?"
      },
      {
        "sentenceUid": "126afc367cacf22dfe838c33187f71a1",
        "text": "Da li mogu da razgovaram sa savjetnikom?",
        "language": "sr-ME",
        "englishText": "Can I chat with an advisor?"
      },
      {
        "sentenceUid": "131a3c5838bae761a116a67b8aa154c2",
        "text": "Koji je status mog zahtjeva?",
        "language": "sr-ME",
        "englishText": "What is the status of my inquiry?"
      },
      {
        "sentenceUid": "ffecfab904b00e0b1d93691165a4e5d8",
        "text": "Kako mogu da izvšim plaćanje u realnom vremenu (instant plaćanje)",
        "language": "sr-ME",
        "englishText": "How do I make a real-time payment?"
      },
      {
        "sentenceUid": "d57bed46072125059ce21ddb3820c081",
        "text": "Koji je bio ukupan iznos naknada koje sam platio/la u posljednjem tromesečju 2022.?",
        "language": "sr-ME",
        "englishText": "What was the total amount of fees I paid in the last quarter of 2022?"
      },
      {
        "sentenceUid": "9a785385a0dba8a5703ccb1eb76ded3b",
        "text": "Kako mogu ostvariti povraćaj novca?",
        "language": "sr-ME",
        "englishText": "What cashback offers do I have?"
      },
      {
        "sentenceUid": "d92078630e026f891b5971361319cfa6",
        "text": "Kako mogu da refinansiram kredit?",
        "language": "sr-ME",
        "englishText": "How can I refinance my loan?"
      },
      {
        "sentenceUid": "e1b8a5579096a477055b3e72759c8bb1",
        "text": "Koji je kurs evra u odnosu na dolar od 1. oktobra",
        "language": "sr-ME",
        "englishText": "What is the current exchange rate from USD to EUR as of October 1, 2023?"
      },
      {
        "sentenceUid": "7443b9dd97d610bdc0f75a6d33691bec",
        "text": "Koliki je iznos slijedeće rate kredita?",
        "language": "sr-ME",
        "englishText": "How much is my next loan installment?"
      },
      {
        "sentenceUid": "470d1a977a2faa73c9bd2cbceab855e9",
        "text": "Koje je stanje na mojem računu?",
        "language": "sr-ME",
        "englishText": "What is my account balance?"
      },
      {
        "sentenceUid": "3930aa2f14ec945666d30bb45bef55f3",
        "text": "Kako da osporim transakciju sa svoje kreditne kartice?",
        "language": "sr-ME",
        "englishText": "Can I dispute a charge on my credit card?"
      },
      {
        "sentenceUid": "059936fd0ebe4d5da4a660aae65ab30b",
        "text": "Mogu li dobiti izvod iz kreditnog biroa?",
        "language": "sr-ME",
        "englishText": "Can I get a copy of my credit report?"
      },
      {
        "sentenceUid": "fa2bbbe230fee33b00169ed1c5abcd94",
        "text": "Kako mogu da naručim novu čekovnu knjižicu?",
        "language": "sr-ME",
        "englishText": "Can I order a new checkbook?"
      },
      {
        "sentenceUid": "33302a0bac090db1c309f53c45acd20f",
        "text": "Kako da zakažem sastanak sa finansijskim savjetnikom?",
        "language": "sr-ME",
        "englishText": "Can I schedule a meeting with a financial advisor?"
      },
      {
        "sentenceUid": "ab7fa78012badee62740ea609eaa03df",
        "text": "Koji je minimalni iznos za ulaganje?",
        "language": "sr-ME",
        "englishText": "What is the minimum amount to invest?"
      },
      {
        "sentenceUid": "04dee4a2d2ac476cf1a5fb0e3908734c",
        "text": "Blokirajte moju kreditnu karticu",
        "language": "sr-ME",
        "englishText": "Block my credit card."
      },
      {
        "sentenceUid": "6b1daf55d82db786ae326340f7b9178b",
        "text": "Kako da prijavim problem sa uslugom?",
        "language": "sr-ME",
        "englishText": "How do I report a service issue?"
      },
      {
        "sentenceUid": "d8f18fa91dece2f70091e2e645b5f13f",
        "text": "Mogu li podnijeti online zahtjev za lični kredit?",
        "language": "sr-ME",
        "englishText": "Can I apply for a personal loan online?"
      },
      {
        "sentenceUid": "a8ff450064a4bb29a3d0b59159a93a3f",
        "text": "Koje su naknade provizije za transakcije u inostranstvo?",
        "language": "sr-ME",
        "englishText": "What are the fees for foreign transactions?"
      },
      {
        "sentenceUid": "b1cebfe46095a6acf546736fef5271d4",
        "text": "Podesite stalni nalog za moju kiriju.",
        "language": "sr-ME",
        "englishText": "Set up a standing order for my rent."
      },
      {
        "sentenceUid": "3068ebf5ed2902c8890a0f504fd85b9e",
        "text": "Da li mogu da promijenim nazive svojih računa?",
        "language": "sr-ME",
        "englishText": "Can I rename my accounts?"
      },
      {
        "sentenceUid": "d3a0b7864faf48307845828e5268dfe7",
        "text": "Da li mogu ranije da podignem novac sa svojeg oročenog depozita?",
        "language": "sr-ME",
        "englishText": "Can I withdraw from my fixed deposit early?"
      },
      {
        "sentenceUid": "9ea6045e634ed9629a8ab10ac15c145b",
        "text": "Možete li da mi pošaljete izvode sa računa od juna 2022. do septembra 2022. na moju email adresu?",
        "language": "sr-ME",
        "englishText": "Can you send me my bank statements from June 2022 to September 2022 to my email address?"
      },
      {
        "sentenceUid": "804c58e2d03a90864c50ee3baf130773",
        "text": "Kako da kreiram virtuelnu karticu?",
        "language": "sr-ME",
        "englishText": "Can I generate a virtual card?"
      },
      {
        "sentenceUid": "cd6f7da6eab01593bd621ca4ff57733f",
        "text": "Kako da obustavim trajni nalog za plaćanje",
        "language": "sr-ME",
        "englishText": "How do I stop a recurring payment?"
      },
      {
        "sentenceUid": "c7f75705769cc234dd1644bb101492b1",
        "text": "Koje je raspoloživo stanje na mojem računu?",
        "language": "sr-ME",
        "englishText": "What is my available balance?"
      },
      {
        "sentenceUid": "80594c105cabe1b98ffa1374a0dfad07",
        "text": "Molim vas da kreirate stalni nalog od 1000€ na moj račun na adresi Ulica Oslobođenja 55 svakog prvog (dana) u mjesecu.",
        "language": "sr-ME",
        "englishText": "Please set up a recurring transfer of 1000$ to my account at MusterPlatz 1, Drtmund, on the first of every month."
      },
      {
        "sentenceUid": "9cf70e89ce73227d1bbaa6e10fdce6c7",
        "text": "Kako promijeniti nadimak mog računa?",
        "language": "sr-ME",
        "englishText": "How do I change my account's nickname?"
      },
      {
        "sentenceUid": "353f632627fbdfeb8938db532030dd95",
        "text": "Kako da povećam limit na svojoj kartici?",
        "language": "sr-ME",
        "englishText": "Can I increase my card limit?"
      },
      {
        "sentenceUid": "55e8b88fdd4312fae0b7ccfa64263bfd",
        "text": "Koji su uređaji povezani sa mojim računom?",
        "language": "sr-ME",
        "englishText": "What devices are linked to my account?"
      },
      {
        "sentenceUid": "9cd7f9c92e809ac2071b8cd7e3f3dc1b",
        "text": "Da li mogu da pristupim izvodu svojeg računa za prošlu godinu?",
        "language": "sr-ME",
        "englishText": "Can I access my account statements from last year?"
      },
      {
        "sentenceUid": "45b2ce598b0af8e8ab693dd82243661e",
        "text": "Kako mogu da podnesem zahtjev za novu karticu?",
        "language": "sr-ME",
        "englishText": "How can I request a new card?"
      },
      {
        "sentenceUid": "4d70241bdb05871c45d4eb87364dfd8f",
        "text": "Kako da podnesem zahtjev za hipoteku?",
        "language": "sr-ME",
        "englishText": "How do I apply for a mortgage?"
      },
      {
        "sentenceUid": "29fae6cb3bf7cae28af71c579e9c2b07",
        "text": "Da li možete da izlistate sve moje račune?",
        "language": "sr-ME",
        "englishText": "Can you list all my accounts?"
      },
      {
        "sentenceUid": "4ba04c3f5b384ec0268ab55a21c3d6af",
        "text": "Kako da pogledam depozite na čekanju?",
        "language": "sr-ME",
        "englishText": "Can I view pending deposits?"
      },
      {
        "sentenceUid": "99488849412d71a376c5d2513722f0b0",
        "text": "Kako da postavim limit potrošnje na svom računu?",
        "language": "sr-ME",
        "englishText": "How do I set a spending limit on my account?"
      },
      {
        "sentenceUid": "0a891c25937afb37e6d91a400b055eb5",
        "text": "Kako mogu da izmjenim primarnu adresu moje e-pošte za račun?",
        "language": "sr-ME",
        "englishText": "How do I change my account's primary email address?"
      },
      {
        "sentenceUid": "75526cffc56ad8b71ad79524350579c6",
        "text": "Koliko je trenutno stanje duga mog kredita?",
        "language": "sr-ME",
        "englishText": "What is my current loan balance?"
      },
      {
        "sentenceUid": "80901021f9095df0854c39b4f37f2acd",
        "text": "Molim vas da zakažete plaćanje računa od 25000RSD mom stanodavcu na adresi Knez Mihailova 123, Beograd, 5. novembra 2023.",
        "language": "sr-ME",
        "englishText": "Please schedule a bill payment of £200 to my landlord at Hauptstr. 123, Berlin, on November 5, 2023."
      },
      {
        "sentenceUid": "d1c7c16dda47fd533d3c7ef62fe6a97e",
        "text": "Koliki kreditni iznos mogu da pozajmim?",
        "language": "sr-ME",
        "englishText": "How much can I borrow?"
      },
      {
        "sentenceUid": "cdc9106e2186ca71a7289a9678938ac8",
        "text": "Možete li mi dati detalje transakcije od 1000€ na adresi Ulica Slobode 45, Nikšić, 12. avgusta 2023.?",
        "language": "sr-ME",
        "englishText": "Can you give me the details of the $150 transaction at Linienstr. 106, Essen on August 12, 2023?"
      },
      {
        "sentenceUid": "8388e38e41ea79b24455bc1bdf902f47",
        "text": "Koliko iznosi kamatna stopa za štedne račune",
        "language": "sr-ME",
        "englishText": "What are the interest rates for savings accounts?"
      },
      {
        "sentenceUid": "b1781545934b72882c4b744a58e33c54",
        "text": "Koje pogodnosti ima moja kartica?",
        "language": "sr-ME",
        "englishText": "What are the benefits of my card?"
      },
      {
        "sentenceUid": "70678084aff923ca14b303ca83445c9d",
        "text": "Koliko imam novca na štednom računu.",
        "language": "sr-ME",
        "englishText": "How much do I have in my savings account?"
      },
      {
        "sentenceUid": "190bf9661706286950d2272e3c58d417",
        "text": "Kako zatvoriti račun kreditne kartice?",
        "language": "sr-ME",
        "englishText": "How do I close a credit card account?"
      },
      {
        "sentenceUid": "5081d210d2d50dbaad997c7f6daef50f",
        "text": "Kako da isključivo pređem na elektronske izvode?",
        "language": "sr-ME",
        "englishText": "How do I switch to online-only statements?"
      },
      {
        "sentenceUid": "8dde417528f3107a57a2b832f7930421",
        "text": "Da li mogu da podesim obavještenja za velike transakcije?",
        "language": "sr-ME",
        "englishText": "Can I set notifications for large transactions?"
      },
      {
        "sentenceUid": "a1243f05b1348fd3c49d3c5b8d2b12b5",
        "text": "Potrebna mi je pomoć sa prenosom novca",
        "language": "sr-ME",
        "englishText": "I need help with my transfer."
      },
      {
        "sentenceUid": "8070bf4fe33529eb08dbfaded35d4ca0",
        "text": "Da li možete da me informišete o vašim najnovijim ponudama?",
        "language": "sr-ME",
        "englishText": "Can you provide information on your latest offers?"
      },
      {
        "sentenceUid": "f8732fc885c46ae40f2225e078ce1db6",
        "text": "Da li možete da mi predložite na koji način da uštedim više novca?",
        "language": "sr-ME",
        "englishText": "Can you suggest ways to save more money?"
      },
      {
        "sentenceUid": "18285b572a2c5a775cab90bcd852b61b",
        "text": "Da li postoje sumnjive aktivnosti na mom računu?",
        "language": "sr-ME",
        "englishText": "Are there any suspicious activities on my account?"
      },
      {
        "sentenceUid": "a7c4b45c5e18e69fa80479070c78af5f",
        "text": "Da li mogu da izvšim vanredno plaćanje rata kredita",
        "language": "sr-ME",
        "englishText": "Can I make an extra payment on my loan?"
      },
      {
        "sentenceUid": "01cd260436925e3cf9af2769225eb85b",
        "text": "Kolika je trenutna stopa za 12-mjesečnu potvrdu o depozitu (CD)?",
        "language": "sr-ME",
        "englishText": "What is the current rate for a 12-month CD?"
      },
      {
        "sentenceUid": "08f0e0637f622403dee6d38b3a90a816",
        "text": "Možete li mi dati bankovne podatke za međunarodni prenos za sljedeći IBAN: ME89370400440532013000?",
        "language": "sr-ME",
        "englishText": "Could you provide me with the bank coordinates for an international transfer to the following IBAN: DE89370400440532013000?"
      },
      {
        "sentenceUid": "dcad535dd9e0abd1da82dfe710073ab2",
        "text": "Da li mogu da ažuriram svoja bezbjednosna pitanja?",
        "language": "sr-ME",
        "englishText": "Can I update my security questions?"
      },
      {
        "sentenceUid": "96d524245cd06c91dd1cd8e3794f9bba",
        "text": "Da li mogu da automatizujem mjesečnu štednju?",
        "language": "sr-ME",
        "englishText": "Can I automate monthly savings?"
      },
      {
        "sentenceUid": "c3cd87741f54b618b8c655effbdebd91",
        "text": "Koji je broj mojeg IBAN računa.",
        "language": "sr-ME",
        "englishText": "What is my IBAN?"
      },
      {
        "sentenceUid": "06dbe994fbf595b686b55921c7c442f5",
        "text": "Kako da deaktiviram uređaj?",
        "language": "sr-ME",
        "englishText": "How do I deactivate a device?"
      },
      {
        "sentenceUid": "2cc88657449ffbaa5d54280c9c3a4463",
        "text": "Koje mogućnosti kreditiranja imam na raspolaganju?",
        "language": "sr-ME",
        "englishText": "What loan options do I have?"
      },
      {
        "sentenceUid": "0a7dab49b080265e4153832fd2037063",
        "text": "Kako da ažuriram svoje lične kontakt podatke?",
        "language": "sr-ME",
        "englishText": "How do I update my contact information?"
      },
      {
        "sentenceUid": "04a9a0d567a67c7bd22a8642a4468157",
        "text": "Da li je na mojoj kartici omogućeno međunarodno plaćanje?",
        "language": "sr-ME",
        "englishText": "Is my card enabled for international payments?"
      },
      {
        "sentenceUid": "8be7c6a94ed78a5aefb2af8431f621d3",
        "text": "Kako da prijavim izgubljenu karticu?",
        "language": "sr-ME",
        "englishText": "How do I report a lost card?"
      },
      {
        "sentenceUid": "01fbdbdafc335df835df67ff51653d2c",
        "text": "Kako mogu kontaktirati korisničku podršku?",
        "language": "sr-ME",
        "englishText": "How can I contact customer support?"
      },
      {
        "sentenceUid": "6d2cecb612668037548027f124bfca76",
        "text": "Koje je radno vrijeme banke?",
        "language": "sr-ME",
        "englishText": "What are the bank’s working hours?"
      },
      {
        "sentenceUid": "3d9d8ab4b200d8f18a53b308d67133e2",
        "text": "Šta će se dogoditi ako ne izvršim plaćanje na vrijeme?",
        "language": "sr-ME",
        "englishText": "What happens if I miss a payment?"
      },
      {
        "sentenceUid": "768bc38959189fd51e455a8c03b1fa50",
        "text": "Kako mogu da podelim račun s prijateljima?",
        "language": "sr-ME",
        "englishText": "Can I split a bill with friends?"
      },
      {
        "sentenceUid": "686ad392c33a16a496eda64ec214ea07",
        "text": "Kada mi je uplaćena poslednja plata?",
        "language": "sr-ME",
        "englishText": "When was my last salary credited?"
      },
      {
        "sentenceUid": "34bdc31366dd164ce0158367f4c36d03",
        "text": "Kako da podnesem žalbu?",
        "language": "sr-ME",
        "englishText": "How do I file a complaint?"
      },
      {
        "sentenceUid": "ce4f648f62a16824f14412e0a69de7f4",
        "text": "Kada će mi biti naplaćena sljedeća rata za Netflix?",
        "language": "sr-ME",
        "englishText": "When will my next direct debit for Netflix be deducted?"
      },
      {
        "sentenceUid": "b4be9b977307440ce78a15f157d2aeb9",
        "text": "Možete li danas prebaciti 500€ s mog tekućeg računa na moj štedni račun?",
        "language": "sr-ME",
        "englishText": "Can you transfer €500 from my checking account to my savings account today?"
      },
      {
        "sentenceUid": "6d13ba5779caa57b3770ef1e9d2bceb3",
        "text": "Kako da promijenim PIN na svojoj kartici?",
        "language": "sr-ME",
        "englishText": "Can I change my card PIN?"
      },
      {
        "sentenceUid": "398fcc7bb5fde5328ba3433f03532325",
        "text": "Da li mogu da vidim pokušaje prijave na moj nalog?",
        "language": "sr-ME",
        "englishText": "Can I see login attempts?"
      },
      {
        "sentenceUid": "6bba7568495ada526d75ad49e7d2a68b",
        "text": "Kako da resetujem lozinku?",
        "language": "sr-ME",
        "englishText": "How can I reset my password?"
      },
      {
        "sentenceUid": "5c29c3b1d9a962b8ee4141d967aba326",
        "text": "Kako mogu uložem novac u ETF-ove?",
        "language": "sr-ME",
        "englishText": "How can I invest in ETFs?"
      },
      {
        "sentenceUid": "e3d2f060855e4c395c7a692c0f45bf81",
        "text": "Koje je stanje računa na dan 15. januara 2023.?",
        "language": "sr-ME",
        "englishText": "What was my account balance on January 15, 2023?"
      },
      {
        "sentenceUid": "536a68f2dc4dc48fd65ba313d0cdf440",
        "text": "Pokažite mi moje nadolazeće naloge za plaćanje",
        "language": "sr-ME",
        "englishText": "Show me my upcoming scheduled payments."
      }
  ];
  
  // Migrate the data
  const migratedData = migrateData(inputData);
  
  // Output the result
  console.log(JSON.stringify(migratedData, null, 2));