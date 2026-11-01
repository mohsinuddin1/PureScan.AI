const fs = require("fs");
const path = require("path");

const hu1_13_data = {
  1: {
    slug: "1-elelmiszerszkenneles-nutri-score-es-nova-besorolas",
    title: "Hogyan Segít az Élelmiszerszkennelés, a Nutri-Score és a NOVA-besorolás az Egészségesebb Életmódban?",
    badge: "Egészség és Táplálkozás",
    desc: "Tudd meg, hogyan segít a mesterséges intelligenciával működő élelmiszerszkenner, a Nutri-Score és a NOVA-skála elkerülni az ultra-feldolgozott élelmiszereket.",
    qa: "Gyors Válasz: Hogyan segít a Nutri-Score és a NOVA az élelmiszerválasztásban?",
    qaText: "A Nutri-Score A-tól E-ig terjedő skálán értékeli az élelmiszerek tápértékét, segítve az egészségesebb opciók gyors azonosítását. A NOVA-osztályozás a feldolgozottság foka szerint csoportosítja a termékeket a minimálisan feldolgozottól (1) az ultra-feldolgozott ételekig (4). Együtt segítik a fogyasztókat elkerülni a túlzottan finomított, adalékanyagokkal teli termékeket, amelyek növelik a szív- és érrendszeri betegségek, valamint az elhízás kockázatát.",
    h3_1: "Mi az a mesterséges intelligenciával működő élelmiszerszkenner, és miért van rá szükséged?",
    p1: "A szupermarketekben a termékcímkék apró betűs részeit és bonyolult E-számait kézzel kibogarászni rengeteg időt vesz igénybe. A Klar AI szkenner a vonalkód vagy a szöveges összetevőlista beolvasásával pillanatok alatt átvilágítja a terméket. Hatalmas tudományos adatbázisokkal veti össze a receptúrát, azonnal leleplezve a rejtett cukrokat, emulgeálószereket és potenciális allergéneket.",
    h3_2: "Hogyan működnek a személyre szabott egészségügyi profilok a gyakorlatban?",
    p2: "Az általános kalóriaszámlálókkal ellentétben a Klar a te egyéni biológiai igényeidhez igazodik. Ha beállítod ételérzékenységeidet (glutén, tejfehérje, szója) vagy speciális céljaidat (keto, vegán), az applikáció egyéni biztonsági pontszámot kalkulál, jelezve, ha egy alapanyag számodra kockázatos lehet.",
    h3_3: "Miért jelentenek veszélyt az ultra-feldolgozott élelmiszerek (NOVA 4. csoport)?",
    p3: "Az ultra-feldolgozott élelmiszerek ipari összetevőkből állnak: tele vannak glükóz-fruktóz sziruppal, mesterséges színezékekkel és állagjavítókkal. A The Lancet neves szaklapban megjelent kutatás kimutatta, hogy napi 4 adagnál több ilyen étel fogyasztása 30%-kal növeli a 2-es típusú cukorbetegség kialakulásának esélyét.",
    steps: [
      "Vonalkód vagy összetevőlista beolvasása okostelefon kamerájával.",
      "Adatelemzés hivatalos európai és nemzetközi élelmiszerbiztonsági adatbázisokkal.",
      "Rejtett kockázatok, hormonrombolók és gyulladáskeltő adalékok azonosítása.",
      "Személyre szabott Nutri-Score és NOVA biztonsági pontszám megjelenítése."
    ],
    promoTitle: "Tudatos és biztonságos bevásárlás a Klar segítségével",
    promoText: "A Klar (korábban PureScan AI) független tudományos szakértelmet ad a kezedbe minden boltban. Szkenneld be az élelmiszereidet és kozmetikumaidat a Klarral, és válaszd a legtisztább alapanyagokat a családod számára!"
  },
  2: {
    slug: "2-kozmetikum-szkenneles-biztonsagos-szepsegapolas",
    title: "Kozmetikum-szkennelés: Honnan Tudhatod, Melyik Kozmetikum Valóban Biztonságos a Bőrödnek?",
    badge: "Bőrápolási Biztonság",
    desc: "Tanuld meg, hogyan ismerheted fel a hormonkárosító anyagokat, allergéneket és irritáló összetevőket a sminkjeidben és kozmetikumaidban egy AI szkennerrel.",
    qa: "Gyors Válasz: Hogyan elemzi a kozmetikai szkenner a szépségápolási termékeket?",
    qaText: "A kozmetikai szkenner AI technológiával olvassa le a latin INCI-összetevőket a kozmetikumok dobozáról. Az adatokat összeveti a legfrissebb toxikológiai és dermatológiai regiszterekkel (FDA, EWG, ECHA), hogy azonnali biztonsági értékelést adjon az endokrin diszruptorokról, allergénekről és kőolajszármazékokról.",
    h3_1: "Mely kozmetikai termékek támogatják valóban a bőröd egészségét?",
    p1: "A legbiztonságosabb termékek mentesek a hormonháztartást zavaró anyagoktól, rákkeltő szennyeződésektől és agresszív tartósítószerektől. Bár a 'természetes' felirat vonzóan cseng, nem minden természetes növényi kivonat biztonságos: az illóolajok például gyakran okoznak kontaktallergiát.",
    h3_2: "Milyen veszélyes anyagok bújnak meg a hétköznapi testápolókban és sminkekben?",
    p2: "Kiemelten fontos kerülni a parabéneket (amelyek ösztrogén-utánzóként viselkednek), a ftalátokat (melyek a 'parfum' gyűjtőfogalom alatt rejtőznek), a formaldehid-leadókat (DMDM Hydantoin) és a bőr védőrétegét roncsoló agresszív szulfátokat.",
    h3_3: "Hogyan garantálja a Klar a kozmetikumok összetevőinek megbízhatóságát?",
    p3: "A Klar személyes laboratóriumi asszisztensként működik a kezedben: nem dől be a reklámszlogeneknek, hanem szigorú nemzetközi tudományos publikációk alapján osztályozza a samponok, krémek és szérumok kockázatait.",
    steps: [
      "Irányítsd a kamerát a kozmetikai termék INCI összetevőlistájára.",
      "Keresztreferenciák futtatása az EWG és az Európai Bizottság SCCS adatbázisaiban.",
      "Hormonrombolók, allergén illatanyagok és mikroműanyagok azonnali kiszűrése.",
      "Személyre szabott bőrbiztonsági pontszám kiértékelése."
    ],
    promoTitle: "Tiszta és ragyogó bőr a Klar segítségével",
    promoText: "Ne kísérletezz a bőröd egészségével! A Klar megmutatja a valóságot a szépségápolási termékek mögött, így nyugodtan és magabiztosan választhatsz tiszta formulákat."
  },
  3: {
    slug: "3-valoban-pontosak-az-elelmiszer-ertekelesek",
    title: "Valóban Pontosak az Élelmiszer-értékelések? Hogyan Határozza Meg Appunk az Ételek Egészségességét?",
    badge: "Adat és Pontosság",
    desc: "Mélyreható elemzés arról, hogyan számolják a tápértékpontszámokat az élelmiszerszkennerek, miben különbözik a NOVA és a Nutri-Score, és miért fontos a tudományos háttér.",
    qa: "Gyors Válasz: Megbízhatóak a szkenner appok által adott élelmiszer-pontszámok?",
    qaText: "Igen, amennyiben az alkalmazás nemzetközileg validált tudományos modellekre épül, mint a Nutri-Score és a NOVA. Az AI nem csupán az üres kalóriákat számolja, hanem a zsírok minőségét, a hozzáadott cukrokat, a sót és a mikrobiomot károsító adalékanyagokat is komplexen értékeli.",
    h3_1: "Miért vezeti félre a vásárlókat a csomagolás elülső oldala?",
    p1: "A gyártók óriási összegeket költenek marketingre, hogy a 'rostban gazdag' vagy 'természetes' állításokkal vonzóvá tegyék azokat a termékeket is, amelyek telis-tele vannak glükózsziruppal és szintetikus állagjavítókkal.",
    h3_2: "Miben különbözik az összetevő-szintű elemzés a felületes tápértéktáblázattól?",
    p2: "Két müzliszelet kalóriatartalma lehet azonos, ám míg az egyik zabpehelyből és diófélékből áll, a másik maltodextrint, színezéket és pálmaolajat tartalmaz. A Klar képes különbséget tenni a valódi tápanyagok és az ipari pótszerek között.",
    h3_3: "Hogyan ellenőrzi a Klar a termékek valós összetételét?",
    p3: "A Klar a legfrissebb független kutatási eredményeket veszi alapul, segítve megelőzni azokat a gyulladásos folyamatokat, amelyeket a rejtett adalékok okozhatnak a bélrendszerben.",
    steps: [
      "Szkenneld be az élelmiszer vonalkódját a boltban.",
      "Összetevők azonnali felbontása és vizsgálata.",
      "Tápértékprofil és feldolgozottsági szint összehasonlítása.",
      "Kiegyensúlyozott és objektív pontszám megtekintése."
    ],
    promoTitle: "Láss a marketing mögé a Klarral",
    promoText: "Nem kell többé bizonytalanul állnod a polcok előtt. A Klar azonnal feltárja az élelmiszerek valódi értékét, hogy mindig a legokosabb döntést hozhasd meg."
  },
  4: {
    slug: "4-mergezoek-a-borapolasi-termekek-kockazati-pontszamok",
    title: "Mérgezőek a Bőrápolóm Összetevői? Hogyan Értelmezd a Kozmetikai Kockázati Pontszámokat?",
    badge: "Összetevő-tudomány",
    desc: "Megismertetünk az INCI-listákkal és a kozmetikai kockázati pontszámokkal. Megtudhatod, miért nem mindig jobb a természetes, és hogyan szűrheted ki a valós veszélyeket.",
    qa: "Gyors Válasz: Lehetnek-e toxikusak a hétköznapi kozmetikumaink összetevői?",
    qaText: "Igen. Sok kereskedelmi kozmetikum tartalmaz felhalmozódó vegyületeket, például ftalátokat, hormonkárosító parabéneket és formaldehid-leadókat. Egyetlen termékben a koncentráció kicsi lehet, de a napi szinten használt 8-12 különböző kozmetikum együttesen jelentős kémiai terhelést ró a szervezetre.",
    h3_1: "Mit jelentenek a kozmetikai kockázati pontszámok (Hazard Scores)?",
    p1: "A kockázati pontszámok tudományos tanulmányokon alapulnak, figyelembe véve a rákkeltő hatást, a hormonrendszeri zavarokat és a bőrirritáció mértékét. A magas kockázatú összetevők komoly nemzetközi aggodalomra adnak okot.",
    h3_2: "Valóban mindig jobb a natúrkozmetikum a szintetikusnál?",
    p2: "Nem feltétlenül. Számos szintetikus összetevő – mint a niancinamid vagy a bőridentikus ceramidok – kiválóan tolerálható és tiszta, míg egyes növényi illóolajok súlyos allergiát válthatnak ki.",
    h3_3: "Hogyan segít a Klar a mindennapi szépségápolási döntésekben?",
    p3: "A Klar pillanatok alatt megfejti a bonyolult latin kifejezéseket, és közérthetően elmagyarázza, mely anyagok támogatják a bőröd megújulását és melyeket érdemes messziről elkerülnöd.",
    steps: [
      "INCI-lista beolvasása telefonos kamerával.",
      "Tudományos kockázatelemzés és allergénszűrés.",
      "Összetevők csoportosítása funkció és biztonság szerint.",
      "Világos, színekkel jelölt biztonsági pontszám."
    ],
    promoTitle: "Bízd a tudományra a bőrápolásod a Klarral",
    promoText: "A Klar segít átlátni a kozmetikai ipar útvesztőit, megvédve a bőröd felszíni barrierjét a rejtett toxikus anyagoktól."
  },
  5: {
    slug: "5-hogyan-olvasd-a-tapertekjeloleseket-tisztan-etkezes",
    title: "Hogyan Olvasd a Tápértékjelöléseket Profi Módon a Fogyáshoz és a Tiszta Étkezéshez?",
    badge: "Tiszta Étkezés",
    desc: "Bonyolultnak találod a tápértékcímkéket? Tanuld meg másodpercek alatt dekódolni az élelmiszerek összetételét és leleplezni a rejtett cukrokat és adalékokat.",
    qa: "Gyors Válasz: Hogyan kell helyesen értelmezni a tápértékcímkét?",
    qaText: "Először mindig ellenőrizd az adagméretet (100g vs adag), majd vizsgáld meg a hozzáadott cukrokat és a transzzsírokat! Az összetevőlistán az elöl lévő anyagok teszik ki a termék legnagyobb részét: ha a cukor vagy a finomított keményítő az első háromban szerepel, a termék nem támogatja a tiszta étkezést.",
    h3_1: "Milyen trükkökkel rejtik el a gyártók a cukrot?",
    p1: "A gyártók gyakran többféle néven szerepeltetik a cukrot (kukoricaszirup, szacharóz, maltodextrin, invertcukor), így egyik sem kerül az összetevőlista legelejére, azt a hamis látszatot keltve, hogy az étel alacsony cukortartalmú.",
    h3_2: "Miért fontos a fehérje és a rostok aránya a zsírokkal szemben?",
    p2: "A magas rost- és fehérjetartalom lassítja a glükóz felszívódását a véráramba, megelőzve az inzulinrobbanást és a rátörő farkaséhséget, ami a fenntartható fogyás alappillére.",
    h3_3: "Hogyan teszi egyszerűvé a bevásárlást a Klar?",
    p3: "A Klar leolvassa a makrotápanyagokat és azonnal figyelmeztet, ha a termékben rejtett cukor vagy káros hidrogénezett növényi olaj található.",
    steps: [
      "Vonalkód szkennelése másodpercek alatt.",
      "Hozzáadott cukrok és rejtett keményítők azonosítása.",
      "Tápanyag-arányok összevetése a diétás céljaiddal.",
      "Azonnali visszajelzés a tiszta étkezés támogatásáról."
    ],
    promoTitle: "Fogyj és étkezz tisztán a Klar segítségével",
    promoText: "Nem kell többé percekig a polcok előtt állva böngészni a mikroszkopikus szövegeket. A Klar másodpercek alatt átvilágítja a csomagolt ételeket."
  },
  6: {
    slug: "6-az-igazsag-a-tiszta-szepsegrol-termeszetes-vs-szintetikus",
    title: "Az Igazság a Tiszta Szépségről (Clean Beauty): Természetes vs. Szintetikus Összetevők",
    badge: "Tiszta Szépségápolás",
    desc: "Valóban mindig biztonságos a natúrkozmetikum? Lerántjuk a leplet a clean beauty tévhiteiről és bemutatjuk a tudományos biztonsági értékelés fontosságát.",
    qa: "Gyors Válasz: Jobbak a természetes összetevők a szintetikusaknál?",
    qaText: "Nem feltétlenül. A természetes növényi kivonatok és illóolajok gyakran tartalmaznak erős allergéneket (például limonént, linaloolt), amelyek fényérzékenységet és ekcémát okozhatnak. Ezzel szemben sok szintetikus hatóanyag – mint a hialuronsav vagy a glicerin – rendkívül stabil, tiszta és kíméletes a bőrhöz.",
    h3_1: "Mi az a zöldrefestés (Greenwashing) a kozmetikai iparban?",
    p1: "A zöldrefestés az a marketingstratégia, amikor egy terméket növényi képekkel és bio szavakkal hirdetnek, miközben a formula 98%-ban agresszív szulfátokat, kőolajszármazékokat és szintetikus tartósítószereket tartalmaz egyetlen csepp növényi kivonat mellett.",
    h3_2: "Mikor indokolt a szintetikus tartósítószerek használata?",
    p2: "A vizes bázisú kozmetikumok megfelelő tartósítás nélkül napok alatt veszélyes baktériumok és penészgombák melegágyává válnának. A modern, biztonságos szintetikus tartósítók védik meg a bőrt a mikrobiális fertőzésektől.",
    h3_3: "Hogyan győz a tudományos vizsgálat a marketing felett a Klarral?",
    p3: "A Klar kizárólag a kémiai összetétel és a bőrgyógyászati tények alapján ítél: kiszűri a valós allergéneket anélkül, hogy bedőlne a divatos natúr-szlogeneknek.",
    steps: [
      "Kozmetikum beolvasása az összetevők valós elemzéséhez.",
      "Természetes és szintetikus komponensek tudományos ellenőrzése.",
      "Zöldrefestett marketingfogások és allergének kiszűrése.",
      "Objektív, biztonságos bőrápolási ajánlás."
    ],
    promoTitle: "Tudományos alapú bőrápolás a Klarral",
    promoText: "A szép bőr titka a tudatos választás. A Klar segít kiszűrni a félrevezető állításokat, hogy csak a bőröd számára legtisztább formulákat használd."
  },
  7: {
    slug: "7-rejtett-mereganyagok-az-elelmiszerekben-es-kozmetikumokban",
    title: "Vannak Rejtett Méreganyagok a Mindennapi Ételeidben és Kozmetikumaidban? Útmutató a Kockázatos Anyagokhoz",
    badge: "Toxikus Anyagok és Egészség",
    desc: "Tudd meg, hogyan azonosíthatod a parabéneket, ftalátokat és az ultra-feldolgozott adalékanyagokat a mindennapi termékekben, amelyek károsíthatják az egészségedet.",
    qa: "Gyors Válasz: Vannak rejtett méreganyagok a mindennapi fogyasztási cikkekben?",
    qaText: "Igen. Számos hétköznapi élelmiszer és kozmetikum tartalmaz vitatott vegyületeket, mint a parabének, ftalátok (lágyítószerek), mesterséges ételszínezékek (Red 40, Yellow 5) és szintetikus tartósítószerek (BHA/BHT). A tartós kitettség hormonális zavarokhoz, allergiákhoz és krónikus gyulladásokhoz vezethet.",
    h3_1: "Milyen veszélyes vegyszerek bújnak meg a kozmetikumaidban?",
    p1: "A 'parfum' vagy 'fragrance' szó mögött jogilag több tucat be nem jelentett vegyület rejtőzhet. Ezek közül sok endokrin diszruptor, amelyek megzavarhatják a pajzsmirigy és a nemi hormonok működését. Krémekkel vagy dezodorokkal közvetlenül a véráramba szívódhatnak fel.",
    h3_2: "Miért jelentenek veszélyt az ultra-feldolgozott élelmiszerek?",
    p2: "Az ultra-feldolgozott ételek glükóz-fruktóz sziruppal, emulgeálószerekkel és nitritekkel vannak tele. Kutatások kimutatták, hogy rendszeres fogyasztásuk nagymértékben megnöveli a metabolikus szindróma és a bélgyulladás kialakulásának esélyét.",
    h3_3: "Hogyan védheted meg magad és családodat a láthatatlan toxioktól?",
    p3: "A latin nevek és E-számok bogarászása helyett a leggyorsabb út a mesterséges intelligencia használata. A Klarral beolvasva a vonalkódot másodpercek alatt átlátható biztonsági értékelést és kockázatelemzést kapsz.",
    steps: [
      "Vonalkód leolvasása az okostelefon kamerájával.",
      "Összetevők egyeztetése az EFSA, SCCS és FDA adataival.",
      "Hormonromboló szerek és káros adalékok leleplezése.",
      "Egyéni egészségügyi állapotra szabott biztonsági pontszám."
    ],
    promoTitle: "Védd meg az egészséged minden nap a Klar segítségével",
    promoText: "Ne bízd a véletlenre a családod biztonságát! A Klar (korábban PureScan AI) azonnali, laboratóriumi szintű tisztánlátást nyújt élelmiszereidről és kozmetikumaidról."
  },
  8: {
    slug: "8-hogyan-szkennelj-elelmiszereket-es-borapolasi-termekeket",
    title: "Hogyan Szkennelj Élelmiszereket és Bőrápolási Termékeket a Káros Anyagok Azonnali Kiszűrésére?",
    badge: "Okos Szkennelés",
    desc: "Fedezd fel a legkönnyebb módszert a termékek ellenőrzésére! Tudd meg, hogyan találják meg a modern AI szkennerek a veszélyes vegyületeket másodpercek alatt.",
    qa: "Gyors Válasz: Hogyan működnek a termékszkennerek?",
    qaText: "A termékszkennerek a telefon kamerájával olvassák be a vonalkódot vagy az összetevők szövegét. Az adatokat valós időben vetik össze a globális toxikológiai és táplálkozástudományi adatbázisokkal, hogy átfogó képet adjanak a termék biztonságáról.",
    h3_1: "Miért idejétmúlt a címkék kézi böngészése?",
    p1: "A mikroszkopikus betűméret és a rejtélyes kódok komoly kémiai ismereteket igényelnének. Egy AI szkenner azonnal, objektív szempontok szerint értékeli a terméket, feleslegessé téve az internetes keresgélést.",
    h3_2: "Hogyan működnek a személyre szabott biztonsági profilok?",
    p2: "Az applikáció összeveti a te személyes egészségügyi állapotodat a termék kémiai összetételével. Figyeli az egyéni allergiákat (glutén, tej, diófélék) és speciális diétákat, megelőzve a kellemetlen reakciókat.",
    h3_3: "Hogyan biztosítja a Klar a mindennapi nyugalmat a vásárlásnál?",
    p3: "A Klar független, tudományos hátteret biztosít, így a szupermarketben járva azonnal megtudhatod, mely termékek szolgálják valóban az egészségedet.",
    steps: [
      "Egészségügyi profil és allergiák beállítása az appban.",
      "Vonalkód vagy összetevőlista beolvasása valós időben.",
      "Klinikai regiszterekkel és tanulmányokkal való összevetés.",
      "Nutri-Score, NOVA és kozmetikai kockázati értékek azonnali megtekintése."
    ],
    promoTitle: "Vedd kezedbe az egészséged irányítását a Klarral",
    promoText: "A mesterséges intelligencia segítségével minden vásárlás stresszmentes és biztonságos lesz. Használd a Klart a tudatos életmódhoz!"
  },
  9: {
    slug: "9-mik-azok-az-orok-vegyszerek-pfas-es-endokrin-diszruptorok",
    title: "Mik Azok az Örök Vegyszerek (PFAS) és Endokrin Diszruptorok az Ételekben és Kozmetikumokban?",
    badge: "PFAS és Hormonbiztonság",
    desc: "Tudd meg mik azok az örök vegyszerek (PFAS), a ftalátok és a hormonrombolók, hol rejtőznek a vízálló sminkekben és élelmiszercsomagolásokban, és hogyan véd a Klar.",
    qa: "Gyors Válasz: Mik azok az örök vegyszerek (PFAS) és hormonrombolók?",
    qaText: "A PFAS szintetikus per- és polifluorozott alkilvegyületek csoportja, amelyek nem bomlanak le a természetben, hanem felhalmozódnak az emberi testben és a környezetben. A hormonrombolók (ftalátok, parabének, BPA) megzavarják a belső elválasztású mirigyek működését, csökkentve a termékenységet és növelve az anyagcserezavarok esélyét.",
    h3_1: "Miért veszélyesek a PFAS-vegyületek az anyagcserére és a hormonokra?",
    p1: "A fluorozott vegyületek és a ftalátok a természetes hormonok (ösztrogén, pajzsmirigyhormonok) receptoraihoz kötődnek. Még egészen apró koncentrációban is felboríthatják a sejtek közötti kommunikációt.",
    h3_2: "Mely élelmiszercsomagolásokban és sminkekben fordulnak elő rejtve?",
    p2: "Gyakran megtalálhatók a vízálló szempillaspirálokban, a tartós rúzsokban (PTFE néven), valamint a zsírálló gyorséttermi csomagolópapírokban és mikrós pattogatott kukoricás zacskókban.",
    h3_3: "Miért nem elegendő pusztán a címkék kézi elolvasása?",
    p3: "A vegyipari szinonimák és a védett illatanyag-formulák mögé rejtett összetevők miatt speciális adatbázis nélkül szinte lehetetlen kiszúrni a fluortartalmú vagy lágyítószer-molekulákat.",
    steps: [
      "Vonalkód vagy összetevők leolvasása a telefon kamerájával.",
      "Keresztreferenciák futtatása a Tox21 és európai toxikológiai regiszterekkel.",
      "PFAS-molekulák és hormonkárosító szerek azonnali jelzése.",
      "Egyértelmű, színkódolt hormonbiztonsági értékelés."
    ],
    promoTitle: "Óvd meg a hormonrendszered épségét a Klarral",
    promoText: "Nem kell vegyészmérnöknek lenned ahhoz, hogy biztonságos termékeket válassz. A Klar (korábban PureScan AI) azonnal átvilágítja a flakonokat, megelőzve az örök vegyszerek bejutását a szervezetedbe."
  },
  10: {
    slug: "10-mi-az-a-bel-bor-tengely-emulgealoszerek-es-akne",
    title: "Mi az a Bél-Bőr Tengely? Hogyan Váltanak ki Pattanásokat az Ultra-feldolgozott Élelmiszerek és Komedogén Kozmetikumok?",
    badge: "Bél és Bőregészség",
    desc: "Ismerd meg a bél-bőr tengely működését, az emulgeálószerek bélflórát romboló hatását és a póruseltömítő kozmetikai zsírok szerepét a pattanások kialakulásában.",
    qa: "Gyors Válasz: Mi az a bél-bőr tengely és hogyan függ össze a pattanásokkal?",
    qaText: "A bél-bőr tengely a bélrendszer mikrobiomja és a bőr közötti kétirányú biokémiai kommunikációs csatorna. Amikor az élelmiszerekben található szintetikus emulgeálószerek (polysorbate 80, karragén) károsítják a bél nyálkahártyáját (áteresztő bél), a véráramba jutó gyulladáskeltő molekulák a faggyúmirigyek túlműködését váltják ki, súlyos aknét okozva.",
    h3_1: "Hogyan károsítják az élelmiszeripari emulgeálószerek a bél védőrétegét?",
    p1: "Az emulgeálószerek mosószerként viselkednek az emésztőrendszerben: feloldják a nyálkahártya védő mucinrétegét, lehetővé téve a toxinok és baktériumtöredékek számára, hogy elérjék a bélfal sejtjeit és gyulladást indítsanak el.",
    h3_2: "Mely komedogén összetevők tömik el kívülről a pórusokat?",
    p2: "Sok gazdag arckrém tartalmaz nehéz zsírsav-észtereket (izopropil-mirisztát, acetilezett lanolin), amelyek a faggyúval és elhalt hámsejtekkel keveredve dugókat képeznek a pórusokban, táptalajt adva a Cutibacterium acnes baktériumoknak.",
    h3_3: "Hogyan tisztíthatod meg a bőröd belülről és kívülről?",
    p3: "A finomított élelmiszerek elhagyása, a természetes rostok fogyasztása és a nem-komedogén bőrápolók használata visszaállítja mind a bélrendszer, mind az arcbőr természetes egyensúlyát.",
    steps: [
      "Élelmiszerek szkennelése a bélkárosító emulgeálószerek azonnali kiszűrésére.",
      "Kozmetikumok ellenőrzése a póruseltömítő komedogén zsírok elkerüléséért.",
      "Gyulladáskeltő összetevők és rejtett cukrok beazonosítása.",
      "Személyre szabott bél- és bőrvédelmi pontszám megjelenítése."
    ],
    promoTitle: "Tiszta bőr és egészséges emésztés a Klarral",
    promoText: "A pattanások elleni küzdelem a konyhában és a fürdőszobában kezdődik. A Klar segít kiszűrni a bélflórát és a pórusokat veszélyeztető anyagokat, hogy bőröd újra egészségesen ragyoghasson."
  },
  11: {
    slug: "11-miert-serult-a-borfelszini-vedoretegem-szintetikus-illatok",
    title: "Miért Sérült a Bőrfelszíni Védőrétegem? A Szintetikus Illatanyagok, Formaldehid-leadók és Ételszínezékek Veszélyei",
    badge: "Bőrvédő Réteg és Biztonság",
    desc: "Tudd meg, miért teszik tönkre a szintetikus illatanyagok (Parfum) és formaldehid-leadók a bőr védőrétegét, és hogyan okoznak belső gyulladást a mesterséges ételszínezékek.",
    qa: "Gyors Válasz: Miért válik a bőr szárazzá, pirossá és irritálttá?",
    qaText: "A bőr védőrétege (lipid barrier) leggyakrabban a szintetikus illatanyagok (Parfum), a szárító alkoholok és a formaldehidet felszabadító tartósítószerek (DMDM Hydantoin) miatt sérül. Ezek kioldják a sejtek közötti ceramidokat, ami fokozott vízvesztést (TEWL), égő érzést és érzékenységet idéz elő.",
    h3_1: "Miért nem garantálja a 'hipoallergén' felirat a biztonságot?",
    p1: "A 'bőrgyógyászatilag tesztelt' vagy 'hipoallergén' kifejezéseknek a legtöbb jogrendszerben nincs kötelező erejű tudományos definíciója. Számos ilyen felirattal ellátott krém tartalmazhat ismert illatanyag-allergéneket, mint a linalool vagy a limonén.",
    h3_2: "Hogyan hatnak a mesterséges ételszínezékek és édesítők a bőrre?",
    p2: "A kőolajszármazékú szintetikus ételszínezékek (Red 40, Yellow 5) és a szintetikus édesítők megzavarhatják a bélflórát és hisztaminreakciókat provokálhatnak, ami bőrpírként és kiütésekként törhet a felszínre.",
    h3_3: "Hogyan építheted újjá a sérült barrier réteget?",
    p3: "A barrier helyreállításához kímélő, illatmentes, ceramidokat, koleszterint és zsírsavakat tartalmazó formulákra van szükség, minimalizálva az agresszív kémiai expozíciót.",
    steps: [
      "Illatanyag-allergének és formaldehid-leadók azonosítása a kozmetikumokban.",
      "Káros mesterséges ételszínezékek és édesítők kiszűrése az ételekből.",
      "Bőrbarát, ceramidokban gazdag termékek kiválasztása.",
      "Személyre szabott barriervédelmi tanácsok azonnali elérése."
    ],
    promoTitle: "Nyugtasd meg és állítsd helyre a bőröd a Klarral",
    promoText: "A Klar segít azonosítani a rejtett irritáló vegyületeket az ételeidben és testápolóidban, hogy a bőröd felszíne újra ellenálló, puha és hidratált lehessen."
  },
  12: {
    slug: "12-milyen-borapolasi-osszetevoket-kerulj-terhesseg-alatt",
    title: "Milyen Bőrápolási Összetevőket és Adalékanyagokat Kell Kerülni Terhesség Alatt? A Retinoidok, Kémiai UV-szűrők és Nitrátok Veszélyei",
    badge: "Terhesség és Családbiztonság",
    desc: "Tudd meg miért tilos a retinoidok és a kémiai fényvédők használata terhesség idején, hogyan befolyásolják a nitrátok a magzatot, és hogyan véd a Klar.",
    qa: "Gyors Válasz: Mely kozmetikai és élelmiszer-összetevők kockázatosak terhesség alatt?",
    qaText: "Terhesség és szoptatás alatt szigorúan kerülni kell a retinoidokat (retinol, tretinoin), a nagy dózisú szalicilsavat (BHA), a hormonromboló kémiai UV-szűrőket (oxibenzon), valamint a feldolgozott húsokban lévő nátrium-nitritet és nitrátokat, mivel ezek átjuthatnak a méhlepényen és veszélyeztethetik a magzat fejlődését.",
    h3_1: "Miért számítanak a retinoidok egyértelműen teratogénnek?",
    p1: "Az A-vitamin származékai bizonyítottan súlyos magzati fejlődési rendellenességeket okozhatnak. Bár a helyileg alkalmazott krémekből kevesebb szívódik fel, a klinikai irányelvek a teljes elhagyásukat javasolják az áldott állapot alatt.",
    h3_2: "Milyen veszélyeket hordoznak a kémiai fényvédők és a nitritek?",
    p2: "Az oxibenzon és oktinoxát kimutathatóan megjelenik az anyatejben és a véráramban, hormonális zavarokat okozva. Az élelmiszeripari nitritek a gyomorban nitrózaminokká alakulhatnak, amelyek sejtkárosító hatásúak.",
    h3_3: "Hogyan választhatsz valóban kismamabiztos termékeket?",
    p3: "Válassz ásványi fényvédőket (cink-oxid), kíméletes hidratálókat és nitritmentes, tiszta élelmiszereket a magzat zavartalan fejlődése érdekében.",
    steps: [
      "Kozmetikumok beolvasása a retinoidok és erős savak azonnali kiszűrésére.",
      "Élelmiszerek ellenőrzése a tartósító nátrium-nitrit (E250) elkerüléséért.",
      "Kifejezetten kismamáknak biztonságos formulák kiválasztása.",
      "Nyugodt, stresszmentes babavárás tudományos biztonsági értékelésekkel."
    ],
    promoTitle: "Teljes biztonság a babának és neked a Klar segítségével",
    promoText: "A várandósság alatt nem szabad kockáztatni. A Klar (korábban PureScan AI) azonnal figyelmeztet a magzatra veszélyes összetevőkre, hogy te és a babád is a legnagyobb biztonságban legyetek."
  },
  13: {
    slug: "13-miert-ritkul-a-hajam-es-viszket-a-fejborom-szulfatok",
    title: "Miért Ritkul a Hajam és Viszket a Fejbőröm? A Durva Szulfátok, Szilikonok és Gyulladáskeltő Magolajok Rejtett Hatásai",
    badge: "Haj és Fejbőr Egészsége",
    desc: "Tudd meg, hogyan szárítják ki a durva szulfátok a fejbőrt, hogyan tömik el a szilikonok a hajhagymákat, és miért okoz hajhullást a belső gyulladás.",
    qa: "Gyors Válasz: Miért viszket a fejbőr és mi okozza a hajkorona ritkulását?",
    qaText: "A fejbőr viszketése és a hajhullás leggyakoribb oka a samponokban található agresszív szulfátok (SLS/SLES), amelyek lemossák a fejbőr savköpenyét (pH 4.5–5.5). Ezzel egyidejűleg a vízben nem oldódó szilikonok bevonják a tüszőket, ami megakadályozza a légzést és elősegíti a korpásodást okozó Malassezia gomba elszaporodását.",
    h3_1: "Hogyan teszik tönkre a szulfátok a fejbőr természetes védelmét?",
    p1: "A szulfátok túl agresszíven tisztítanak: a faggyú mellett kioldják a létfontosságú lipideket is, ami mikrosérüléseket, feszülő érzést és kompenzációs zsírosodást eredményez.",
    h3_2: "Miért veszélyesek a vízben nem oldódó szilikonok a hajhagymákra?",
    p2: "Bár a szilikonok sima tapintást adnak a hajnak, felhalmozódnak a fejbőrön, eltömítik a tüszőket és hosszú távon a hajszálak elvékonyodásához, valamint hajhulláshoz vezetnek.",
    h3_3: "Hogyan fokozzák a finomított növényi olajok és a cukor a gyulladást?",
    p3: "A túl sok omega-6 zsírsavat tartalmazó étrend és a vércukor-ingadozás fokozza a szervezetben a szisztémás gyulladást és a dihidrotesztoszteron (DHT) aktivitását a hajhagymáknál.",
    steps: [
      "Samponok és hajápolók szkennelése az SLS és szilikonok kiszűrésére.",
      "Hajformázók vizsgálata a póruseltömítő szintetikus viaszok elkerüléséért.",
      "Áttérés pH-harmonikus (4.5–5.5), kímélő növényi tisztítókra.",
      "Személyre szabott fejbőrbiztonsági pontszám kiértékelése."
    ],
    promoTitle: "Dús és egészséges hajkorona a Klar segítségével",
    promoText: "A haj szépsége az egészséges fejbőrnél kezdődik. A Klar segít kiszűrni a tüszőket roncsoló vegyületeket, hogy hajad újra élettel teli és erős lehessen."
  }
};

let count = 0;
for (const [idStr, data] of Object.entries(hu1_13_data)) {
  const id = parseInt(idStr);
  const enFile = fs.readdirSync("src/content/blog/en").find(x => x.startsWith(id + "-"));
  if (!enFile) continue;
  const enContent = fs.readFileSync("src/content/blog/en/" + enFile, "utf-8");
  const enSourcesMatch = enContent.match(/<div className="mt-12 pt-8 border-t[^>]*>[\s\S]*?<\/div>/);
  const sourcesHtml = enSourcesMatch ? enSourcesMatch[0] : "";

  const imgMatch = enContent.match(/image:\s*["\x27]([^"\x27]+)["\x27]/);
  const dateMatch = enContent.match(/publishDate:\s*["\x27]([^"\x27]+)["\x27]/);
  const img = imgMatch ? imgMatch[1] : "";
  const date = dateMatch ? dateMatch[1] : "";

  const fileContent = `---
id: ${id}
title: "${data.title}"
badge: "${data.badge}"
description: "${data.desc}"
image: "${img}"
publishDate: "${date}"
---
import { ShieldAlert, Zap, SearchCheck, CheckCircle2 } from 'lucide-react';

<div className="prose prose-slate prose-lg max-w-none text-slate-700 space-y-6">
  <div className="bg-amber-50 border border-amber-100 p-6 rounded-2xl mb-8">
    <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2"><ShieldAlert className="w-5 h-5 text-amber-600" />${data.qa}</h3>
    <p className="text-slate-700 font-medium">${data.qaText}</p>
  </div>

  <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">${data.h3_1}</h3>
  <p>${data.p1}</p>

  <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">${data.h3_2}</h3>
  <p>${data.p2}</p>

  <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">${data.h3_3}</h3>
  <p>${data.p3}</p>

  <ol className="list-decimal pl-6 space-y-2 mt-4 font-medium">
    <li><strong>${data.steps[0].split(":")[0]}:</strong> ${data.steps[0]}</li>
    <li><strong>${data.steps[1].split(":")[0]}:</strong> ${data.steps[1]}</li>
    <li><strong>${data.steps[2].split(":")[0]}:</strong> ${data.steps[2]}</li>
    <li><strong>${data.steps[3].split(":")[0]}:</strong> ${data.steps[3]}</li>
  </ol>

  <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">${data.promoTitle}</h3>
  <p>${data.promoText}</p>

  ${sourcesHtml}
</div>
`;

  const destPath = path.join("src/content/blog/hu", `${data.slug}.mdx`);
  fs.writeFileSync(destPath, fileContent.trim());
  count++;
}

console.log(`Successfully generated ${count} Hungarian blogs (1-13).`);

