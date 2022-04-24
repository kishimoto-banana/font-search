module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      spacing: {
        100: '28rem',
        128: '32rem',
        156: '48rem',
      },
      fontFamily: {
        kaiseiopti: ['"Kaisei Opti"'],
        kaiseidecol: ['"Kaisei Decol"'],
        kaiseiharunoumi: ['"Kaisei HarunoUmi"'],
        kaiseitokumin: ['"Kaisei Tokumin"'],
        hinamincho: ['"Hina Mincho"'],
        kleeone: ['"Klee One"'],
        rampartone: ['"Rampart One"'],
        shipporimincho: ['"Shippori Mincho"'],
        sawarabigothic: ['"Sawarabi Gothic"'],
        sawarabimincho: ['"Sawarabi Mincho"'],
        newtegomin: ['"New Tegomin"'],
        kiwimaru: ['"Kiwi Maru"'],
        delagothicone: ['"Dela Gothic One"'],
        yomogi: ['"Yomogi"'],
        hachimarupop: ['"Hachi Maru Pop"'],
        pottaone: ['"Potta One"'],
        stick: ['"Stick"'],
        rocknrollone: ['"RocknRoll One"'],
        reggaeone: ['"Reggae One"'],
        trainone: ['"Train One"'],
        dotgothic16: ['"DotGothic16"'],
        yuseimagic: ['"Yusei Magic"'],
        kosugi: ['"Kosugi"'],
        kosugimaru: ['"Kosugi Maru"'],
        mplus1: ['"M PLUS 1"'],
        mplus2: ['"M PLUS 2"'],
        mplus1code: ['"M PLUS 1 Code"'],
        notosansjp: ['"Noto Sans JP"'],
        notoserifjp: ['"Noto Serif JP"'],
        zenantiquesoft: ['"Zen Antique Soft"'],
        murecho: ['"Murecho"'],
        mochiypopone: ['Mochiy Pop One'],
        yujisyuku: ['"Yuji Syuku"'],
        yujiboku: ['"Yuji Boku"'],
        yujimai: ['"Yuji Mai"'],
        zenkakugothicnew: ['"Zen Kaku Gothic New"'],
        zenmarugothic: ['"Zen Maru Gothic"'],
        zenkakugothicantique: ['"Zen Kaku Gothic Antique"'],
        zenoldmincho: ['"Zen Old Mincho"'],
        zenantique: ['"Zen Antique"'],
        zenkurenaido: ['"Zen Kurenaido"'],
        shipporiantique: ['"Shippori Antique"'],
        bizudgothic: ['"BIZ UDGothic"'],
        bizudmincho: ['"BIZ UDMincho"'],
        bizudpmincho: ['"BIZ UDPMincho"'],
        aotfjunpro: ['"a-otf-jun-pro"'],
        aotfudreiminpr6n: ['"a-otf-ud-reimin-pr6n"'],
        aotfryuminpr6n: ['"a-otf-ryumin-pr6n"'],
        aotfudshingopr6n: ['"a-otf-ud-shin-go-pr6n"'],
        aotfudshinmarugopr6n: ['"a-otf-ud-shin-maru-go-pr6n"'],
        abappare: ['"ab-appare"'],
        abshinyubipenjigyosyotai: ['"ab-shinyubipenjigyosyotai"'],
        abootori: ['"ab-ootori"'],
        abyogurt: ['"ab-yogurt"'],
        abyamabikob: ['"ab-yamabiko-b"'],
        abwarakum: ['"ab-waraku-m"'],
        abwalk: ['"ab-walk"'],
        abtsubaki: ['"ab-tsubaki"'],
        abtorib: ['"ab-tori-b"'],
        abtegami: ['"ab-tegami"'],
        absurugau: ['"ab-suruga-u"'],
        abstickmedium: ['"ab-stick-medium"'],
        abseiryulight: ['"ab-seiryu-light"'],
        abryusennatsu: ['"ab-ryusen-natsu"'],
        abryusenharu: ['"ab-ryusen-haru"'],
        abpochi: ['"ab-pochi"'],
        abmaruhanamaki: ['"ab-maruhanamaki"'],
        ablineboardbold: ['"ab-lineboard-bold"'],
        abkumikim: ['"ab-kumiki-m"'],
        abkumikil: ['"ab-kumiki-l"'],
        abkotodamal: ['"ab-kotodama-l"'],
        abkotodamaf: ['"ab-kotodama-f"'],
        abkokorono3: ['"ab-kokoro-no3"'],
        abkokorono1: ['"ab-kokoro-no1"'],
        abkokikaku: ['"ab-kokikaku"'],
        abkoki: ['"ab-koki"'],
        abkazunaunf: ['"ab-kazunaun-f"'],
        abkarutael: ['"ab-karuta-el"'],
        abkailight: ['"ab-kai-light"'],
        abjarokubold: ['"ab-jaroku-bold"'],
        abjgu: ['"ab-j-gu"'],
        abjchoki: ['"ab-j-choki"'],
        abikkyu: ['"ab-ikkyu"'],
        abhouganm500: ['"ab-hougan-m500"'],
        abhiro: ['"ab-hiro"'],
        abhierosregular: ['"ab-hieros-regular"'],
        abgagakum: ['"ab-gagaku-m"'],
        abfudeshichi: ['"ab-fudeshichi"'],
        abdoudoukaisyo: ['"ab-doudoukaisyo"'],
        abclipmedium: ['"ab-clip-medium"'],
        abcircle: ['"ab-circle"'],
        abanzu: ['"ab-anzu"'],
        abandante: ['"ab-andante"'],
        ab24h: ['"ab-24h"'],
        hottenshokk: ['"hot-tenshokk"'],
        hottenkoinkk: ['"hot-tenkoinkk"'],
        hotsoshokk: ['"hot-soshokk"'],
        hotkointaikk: ['"hot-kointaikk"'],
        hotkaishokk: ['"hot-kaishokk"'],
        hotgyoshokk: ['"hot-gyoshokk"'],
        hotgfkaishokk: ['"hot-gfkaishokk"'],
        hotgekai11kk: ['"hot-gekai11kk"'],
        kokuryu: ['"kokuryu"'],
        shinryu: ['"shinryu"'],
        dnpshueinminchostd: ['"dnp-shuei-nmincho-std"'],
        dnpshueinshogominchostd: ['"dnp-shuei-nshogomincho-std"'],
        tashizuku: ['"ta-shizuku"'],
        tarehitsum: ['"ta-rehitsu-m"'],
        tapoptomo: ['"ta-pop-tomo"'],
        tapopkaku: ['"ta-pop-kaku"'],
        taoonishi: ['"ta-oonishi"'],
        takobe: ['"ta-kobe"'],
        tanasubi: ['"ta-nasubi"'],
        tamiyabi: ['"ta-miyabi"'],
        abtsurara: ['"ab-tsurara"'],
        abtoria: ['"ab-tori-a"'],
        abtombobold: ['"ab-tombo-bold"'],
        abryushichi: ['"ab-ryushichi"'],
        abryusenaki: ['"ab-ryusen-aki"'],
        abmegadot9: ['"ab-megadot9"'],
        abkinmokuseikuro: ['"ab-kinmokusei-kuro"'],
        abhanamaki: ['"ab-hanamaki"'],
        abaotama: ['"ab-aotama"'],
        abanzur: ['"ab-anzu-r"'],
        abaki: ['"ab-aki"'],
        tbudminchostd: ['"tbudmincho-std"'],
        tbudrgothicstd: ['"tbudrgothic-std"'],
        tbudgothicstd: ['"tbudgothic-std"'],
        aotfudshingocon80pr6n: ['"a-otf-ud-shin-go-con80-pr6n"'],
        aotfgothicmb101pr6n: ['"a-otf-gothic-mb101-pr6n"'],
        yugothicpr6n: ['"yu-gothic-pr6n"'],
        uddigikyokashopro: ['"uddigikyokasho-pro"'],
        setofontsp: ['"setofont-sp"'],
        oshidashimgothic: ['"oshidashi-m-gothic"'],
        oradanominchogsrr: ['"oradano-mincho-gsrr"'],
        timemachinewa: ['"timemachine-wa"'],
        kurobaracinderella: ['"kurobara-cinderella"'],
        rondeb: ['"ronde-b"'],
        poprumcute: ['"poprumcute"'],
        mitimasu: ['"mitimasu"'],
        kaisotai: ['"kaisotai"'],
        isemin: ['"isemin"'],
        isego: ['"isego"'],
        genkaimincho: ['"genkaimincho"'],
        honokamarugothic: ['"honoka-maru-gothic"'],
        honokaantiquemaru: ['"honoka-antique-maru"'],
        fotudmarugosmallpr6n: ['"fot-udmarugo-small-pr6n"'],
        fottsukuaoldminpr6n: ['"fot-tsukuaoldmin-pr6n"'],
        fottsukuminpr6n: ['"fot-tsukumin-pr6n"'],
        fotudkakugosmallpr6n: ['"fot-udkakugo-small-pr6n"'],
        fotudkakugoc80pro: ['"fot-udkakugoc80-pro"'],
        fotudkakugoc70pro: ['"fot-udkakugoc70-pro"'],
        fotudkakugoc60pro: ['"fot-udkakugoc60-pro"'],
        fotchiarostd: ['"fot-chiaro-std"'],
        fotudminchopr6n: ['"fot-udmincho-pr6n"'],
        bokutohrera: ['"bokutoh-rera"'],
        abajiminkoheb: ['"abajimin-koheb"'],
        wanpakurera: ['"wanpaku-rera"'],
        nitalagoruika: ['"nitalago-ruika"'],
        nitalagorera: ['"nitalago-rera"'],
        septembern: ['"september-n"'],
        capirera: ['"capirera"'],
        bokutohruika: ['"bokutoh-ruika"'],
        happyruika: ['"happy-ruika"'],
        wanpakuruika: ['"wanpaku-ruika"'],
        ruika: ['"ruika"'],
        rera: ['"rera"'],
        abyoshienoryokandb: ['"ab-yoshienoryokan-db"'],
        abyoshienoryokanm: ['"ab-yoshienoryokan-m"'],
        abyoshienoryokanb: ['"ab-yoshienoryokan-b"'],
        abajiminsyuleb: ['"abajimin-syuleb"'],
        absekka: ['"ab-sekka"'],
        abajiminsyuveb: ['"abajimin-syuveb"'],
        abtyuusyobokunenn: ['"ab-tyuusyobokunenn"'],
        abajiminmchikuceb: ['"abajiminm-chikuceb"'],
        abpolcadot: ['"ab-polcadot"'],
        abajiminmsyueb: ['"abajiminm-syueb"'],
        abajiminmmineb: ['"abajiminm-mineb"'],
        abtsurumaru: ['"ab-tsurumaru"'],
        abajiminmsyuleb: ['"abajiminm-syuleb"'],
        abtanteidan: ['"ab-tanteidan"'],
        abajiminmsyuveb: ['"abajiminm-syuveb"'],
        abyurumin: ['"ab-yurumin"'],
        abajiminmryoeb: ['"abajiminm-ryoeb"'],
        abshiguma: ['"ab-shiguma"'],
        abajiminsoeb: ['"abajimin-soeb"'],
        abryusenfuyu: ['"ab-ryusen-fuyu"'],
        abajiminmkoheb: ['"abajiminm-koheb"'],
        absanpobito: ['"ab-sanpobito"'],
        abajiminmgyoeb: ['"abajiminm-gyoeb"'],
        abneuron: ['"ab-neuron"'],
        abajiminmsoeb: ['"abajiminm-soeb"'],
        abajiminryoeb: ['"abajimin-ryoeb"'],
        abajimingyoeb: ['"abajimin-gyoeb"'],
        abajiminmchikueb: ['"abajiminm-chikueb"'],
        abshoutenmaru: ['"ab-shoutenmaru"'],
        abajiminsyueb: ['"abajimin-syueb"'],
        abroman: ['"ab-roman"'],
        abajiminmineb: ['"abajimin-mineb"'],
        abajiminchikueb: ['"abajimin-chikueb"'],
        abajiminchikuceb: ['"abajimin-chikuceb"'],
        abkotodamau: ['"ab-kotodama-u"'],
        tafugafude: ['"ta-fuga-fude"'],
        abitaikoku: ['"ab-itaikoku"'],
        tayugemeijin: ['"ta-yugemeijin"'],
        abhasefude: ['"ab-hasefude"'],
        takoigokoro: ['"ta-koigokoro"'],
        abmayuminwalk: ['"ab-mayuminwalk"'],
        abkotatsu: ['"ab-kotatsu"'],
        tayuka: ['"ta-yuka"'],
        abnara: ['"ab-nara"'],
        takasanemarugo: ['"ta-kasanemarugo"'],
        abquadra: ['"ab-quadra"'],
        taengeifude: ['"ta-engeifude"'],
        abkokorono2: ['"ab-kokoro-no2"'],
        tamadam: ['"ta-madam"'],
        tasouiimei: ['"ta-souiimei"'],
        takakushadow: ['"ta-kaku-shadow"'],
        taaki: ['"ta-aki"'],
        abmarusan: ['"ab-marusan"'],
        tadansyaku: ['"ta-dansyaku"'],
        abomusubi: ['"ab-omusubi"'],
        abhasemomor: ['"ab-hasemomo-r"'],
        abkirigirisu: ['"ab-kirigirisu"'],
        abkotsubu: ['"ab-kotsubu"'],
        abcountryroad: ['"ab-countryroad"'],
        absuzume: ['"ab-suzume"'],
        abkirakul: ['"ab-kiraku-l"'],
        abplus: ['"ab-plus"'],
        abdonmai: ['"ab-donmai"'],
        abkumikib: ['"ab-kumiki-b"'],
        abgagakub: ['"ab-gagaku-b"'],
        abkikori: ['"ab-kikori"'],
        abbooing: ['"ab-booing"'],
        abkesera: ['"ab-kesera"'],
        abbabywalk: ['"ab-babywalk"'],
        abdigicomb: ['"ab-digicomb"'],
        abintore: ['"ab-intore"'],
        abkarutabold: ['"ab-karuta-bold"'],
        abdoramin: ['"ab-doramin"'],
        vdlkuromincho: ['"vdl-kuromincho"'],
        vdlpenletter: ['"vdl-penletter"'],
        vdlgothicmincho: ['"vdl-gothicmincho"'],
        yamamotoanstdn: ['"yamamotoan-stdn"'],
        yamamotoanclassicstdn: ['"yamamotoan-classic-stdn"'],
        kinutamaruminyoshinostdn: ['"kinuta-maruminyoshino-stdn"'],
        kinutamarumintikumastdn: ['"kinuta-marumintikuma-stdn"'],
        kinutamaruminshinanostdn: ['"kinuta-maruminshinano-stdn"'],
        kinutamaruminoldstdn: ['"kinuta-maruminold-stdn"'],
        kinutamaruminkisostdn: ['"kinuta-maruminkiso-stdn"'],
        kinutamaruminkaturastdn: ['"kinuta-maruminkatura-stdn"'],
        kinutamaruminfujistdn: ['"kinuta-maruminfuji-stdn"'],
        iroha32sakurastdn: ['"iroha-32sakura-stdn"'],
        iroha31nirestdn: ['"iroha-31nire-stdn"'],
        iroha30momijistdn: ['"iroha-30momiji-stdn"'],
        iroha29umestdn: ['"iroha-29ume-stdn"'],
        iroha28kiristdn: ['"iroha-28kiri-stdn"'],
        iroha27keyakistdn: ['"iroha-27keyaki-stdn"'],
        iroha26tubakistdn: ['"iroha-26tubaki-stdn"'],
        iroha25ichostdn: ['"iroha-25icho-stdn"'],
        iroha24matustdn: ['"iroha-24matu-stdn"'],
        iroha23kaedestdn: ['"iroha-23kaede-stdn"'],
        iroha22momistdn: ['"iroha-22momi-stdn"'],
        iroha21popurastdn: ['"iroha-21popura-stdn"'],
        toppanbunkyuminchopr6n: ['"toppan-bunkyu-mincho-pr6n"'],
        toppanbunkyumidashiminst: ['"toppan-bunkyu-midashi-min-st"'],
        toppanbunkyumidashigostd: ['"toppan-bunkyu-midashi-go-std"'],
        tarb: ['"ta-rb"'],
        takouran: ['"ta-kouran"'],
        takotodamar: ['"ta-kotodama-r"'],
        takairegular: ['"ta-kai-regular"'],
        tahougank500: ['"ta-hougan-k500"'],
        tahoudatem500: ['"ta-houdate-m500"'],
        taf1blockline: ['"ta-f1blockline"'],
        tacandy: ['"ta-candy"'],
        vdlyotag: ['"vdl-yotag"'],
        vdlterag: ['"vdl-terag"'],
        vdlpetag: ['"vdl-petag"'],
        vdlpenlady: ['"vdl-penlady"'],
        vdlpengentle: ['"vdl-pengentle"'],
        vdlmegamaru: ['"vdl-megamaru"'],
        vdlmegag: ['"vdl-megag"'],
        vdllogona: ['"vdl-logona"'],
        vdllogojrblack: ['"vdl-logojrblack"'],
        vdllogomaru: ['"vdl-logomaru"'],
        vdllogomarujr: ['"vdl-logomaru-jr"'],
        vdlgigamaru: ['"vdl-gigamaru"'],
        vdllogojr: ['"vdl-logojr"'],
        vdllogog: ['"vdl-logog"'],
        vdllinegr: ['"vdl-linegr"'],
        vdllineg: ['"vdl-lineg"'],
        vdlkyosensya: ['"vdl-kyosensya"'],
        vdlgigamarujr: ['"vdl-gigamarujr"'],
        vdlgigajr: ['"vdl-gigajr"'],
        vdlgigag: ['"vdl-gigag"'],
        vdladmin: ['"vdl-admin"'],
        fotseuratpron: ['"fot-seurat-pron"'],
        fotrodinpron: ['"fot-rodin-pron"'],
        fotmatissepron: ['"fot-matisse-pron"'],
        fotcezannepron: ['"fot-cezanne-pron"'],
        yuminchopr6n: ['"yu-mincho-pr6n"'],
        dnpshueiantistd: ['"dnp-shuei-anti-std"'],
        dnpshuei4gobstd: ['"dnp-shuei-4gob-std"'],
        dnpshuei4gostd: ['"dnp-shuei-4go-std"'],
        dnpshueishogominchostd: ['"dnp-shuei-shogomincho-std"'],
        heiseikakugothicstdn: ['"heisei-kaku-gothic-stdn"'],
        heiseiminchostdn: ['"heisei-mincho-stdn"'],
        kazurakisp2n: ['"kazuraki-sp2n"'],
      },
      keyframes: {
        'fade-in-down': {
          '0%': {
            opacity: '0',
            transform: 'translateY(-10px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        'fade-out-down': {
          from: {
            opacity: '1',
            transform: 'translateY(0px)',
          },
          to: {
            opacity: '0',
            transform: 'translateY(10px)',
          },
        },
        'fade-in-up': {
          '0%': {
            opacity: '0',
            transform: 'translateY(20px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        'fade-out-up': {
          from: {
            opacity: '1',
            transform: 'translateY(0px)',
          },
          to: {
            opacity: '0',
            transform: 'translateY(10px)',
          },
        },
      },
      animation: {
        'fade-in-down': 'fade-in-down 0.5s ease-out',
        'fade-out-down': 'fade-out-down 0.5s ease-out',
        'fade-in-up': 'fade-in-up 0.5s ease-out',
        'fade-out-up': 'fade-out-up 0.5s ease-out',
      },
    },
  },
  plugins: [require('daisyui')],
}
