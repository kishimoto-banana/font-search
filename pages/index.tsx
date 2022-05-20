import 'cropperjs/dist/cropper.css'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Script from 'next/script'
import React, { useEffect, useRef, useState } from 'react'
import { Cropper } from 'react-cropper'
import BuyMeACoffee from '../components/buymeacoffee'
import ExampleModal from '../components/exampleModal'
import FontLoading from '../components/fontLoading'
import FontModal from '../components/fontModal'
import Footer from '../components/Footer'
import GoogleAnalytics from '../components/gtag'
import ImageUploader from '../components/imageUploader'
import Loading from '../components/loading'
import Share from '../components/share'
import niwatori from '../public/niwatori.jpeg'

const fontSearchApiEndpoint = process.env.NEXT_PUBLIC_FONT_SEARCH_API_ENDPOINT
const title = 'フォントピント（β）'
const maxChars = 25
const abortTime = 15000

type PredictFont = {
  fontName: string
  fontNameJa: string
  fontNameEn: string
  fontWeight: number
  type: string
  adobeId: string
  score: number
}

const fontClassName = (fontName: string) => {
  switch (fontName) {
    case 'kaiseiopti':
      return 'font-kaiseiopti'
    case 'kaiseidecol':
      return 'font-kaiseidecol'
    case 'kaiseiharunoumi':
      return 'font-kaiseiharunoumi'
    case 'kaiseitokumin':
      return 'font-kaiseitokumin'
    case 'hinamincho':
      return 'font-hinamincho'
    case 'kleeone':
      return 'font-kleeone'
    case 'rampartone':
      return 'font-rampartone'
    case 'shipporimincho':
      return 'font-shipporimincho'
    case 'sawarabigothic':
      return 'font-sawarabigothic'
    case 'sawarabimincho':
      return 'font-sawarabimincho'
    case 'newtegomin':
      return 'font-newtegomin'
    case 'kiwimaru':
      return 'font-kiwimaru'
    case 'delagothicone':
      return 'font-delagothicone'
    case 'yomogi':
      return 'font-yomogi'
    case 'hachimarupop':
      return 'font-hachimarupop'
    case 'pottaone':
      return 'font-pottaone'
    case 'stick':
      return 'font-stick'
    case 'rocknrollone':
      return 'font-rocknrollone'
    case 'reggaeone':
      return 'font-reggaeone'
    case 'trainone':
      return 'font-trainone'
    case 'dotgothic16':
      return 'font-dotgothic16'
    case 'yuseimagic':
      return 'font-yuseimagic'
    case 'kosugi':
      return 'font-kosugi'
    case 'kosugimaru':
      return 'font-kosugimaru'
    case 'mplus1':
      return 'font-mplus1'
    case 'mplus2':
      return 'font-mplus2'
    case 'mplus1code':
      return 'font-mplus1code'
    case 'notosansjp':
      return 'font-notosansjp'
    case 'notoserifjp':
      return 'font-notoserifjp'
    case 'zenantiquesoft':
      return 'font-zenantiquesoft'
    case 'murecho':
      return 'font-murecho'
    case 'mochiypopone':
      return 'font-mochiypopone'
    case 'yujisyuku':
      return 'font-yujisyuku'
    case 'yujiboku':
      return 'font-yujiboku'
    case 'yujimai':
      return 'font-yujimai'
    case 'zenkakugothicnew':
      return 'font-zenkakugothicnew'
    case 'zenmarugothic':
      return 'font-zenmarugothic'
    case 'zenkakugothicantique':
      return 'font-zenkakugothicantique'
    case 'zenoldmincho':
      return 'font-zenoldmincho'
    case 'zenantique':
      return 'font-zenantique'
    case 'zenkurenaido':
      return 'font-zenkurenaido'
    case 'shipporiantique':
      return 'font-shipporiantique'
    case 'bizudgothic':
      return 'font-bizudgothic'
    case 'bizudmincho':
      return 'font-bizudmincho'
    case 'bizudpmincho':
      return 'font-bizudpmincho'
    case 'aotfjunpro':
      return 'font-aotfjunpro'
    case 'aotfudreiminpr6n':
      return 'font-aotfudreiminpr6n'
    case 'aotfryuminpr6n':
      return 'font-aotfryuminpr6n'
    case 'aotfudshingopr6n':
      return 'font-aotfudshingopr6n'
    case 'aotfudshinmarugopr6n':
      return 'font-aotfudshinmarugopr6n'
    case 'abappare':
      return 'font-abappare'
    case 'abshinyubipenjigyosyotai':
      return 'font-abshinyubipenjigyosyotai'
    case 'abootori':
      return 'font-abootori'
    case 'abyogurt':
      return 'font-abyogurt'
    case 'abyamabikob':
      return 'font-abyamabikob'
    case 'abwarakum':
      return 'font-abwarakum'
    case 'abwalk':
      return 'font-abwalk'
    case 'abtsubaki':
      return 'font-abtsubaki'
    case 'abtorib':
      return 'font-abtorib'
    case 'abtegami':
      return 'font-abtegami'
    case 'absurugau':
      return 'font-absurugau'
    case 'abstickmedium':
      return 'font-abstickmedium'
    case 'abseiryulight':
      return 'font-abseiryulight'
    case 'abryusennatsu':
      return 'font-abryusennatsu'
    case 'abryusenharu':
      return 'font-abryusenharu'
    case 'abpochi':
      return 'font-abpochi'
    case 'abmaruhanamaki':
      return 'font-abmaruhanamaki'
    case 'ablineboardbold':
      return 'font-ablineboardbold'
    case 'abkumikim':
      return 'font-abkumikim'
    case 'abkumikil':
      return 'font-abkumikil'
    case 'abkotodamal':
      return 'font-abkotodamal'
    case 'abkotodamaf':
      return 'font-abkotodamaf'
    case 'abkokorono3':
      return 'font-abkokorono3'
    case 'abkokorono1':
      return 'font-abkokorono1'
    case 'abkokikaku':
      return 'font-abkokikaku'
    case 'abkoki':
      return 'font-abkoki'
    case 'abkazunaunf':
      return 'font-abkazunaunf'
    case 'abkarutael':
      return 'font-abkarutael'
    case 'abkailight':
      return 'font-abkailight'
    case 'abjarokubold':
      return 'font-abjarokubold'
    case 'abjgu':
      return 'font-abjgu'
    case 'abjchoki':
      return 'font-abjchoki'
    case 'abikkyu':
      return 'font-abikkyu'
    case 'abhouganm500':
      return 'font-abhouganm500'
    case 'abhiro':
      return 'font-abhiro'
    case 'abhierosregular':
      return 'font-abhierosregular'
    case 'abgagakum':
      return 'font-abgagakum'
    case 'abfudeshichi':
      return 'font-abfudeshichi'
    case 'abdoudoukaisyo':
      return 'font-abdoudoukaisyo'
    case 'abclipmedium':
      return 'font-abclipmedium'
    case 'abcircle':
      return 'font-abcircle'
    case 'abanzu':
      return 'font-abanzu'
    case 'abandante':
      return 'font-abandante'
    case 'ab24h':
      return 'font-ab24h'
    case 'hottenshokk':
      return 'font-hottenshokk'
    case 'hottenkoinkk':
      return 'font-hottenkoinkk'
    case 'hotsoshokk':
      return 'font-hotsoshokk'
    case 'hotkointaikk':
      return 'font-hotkointaikk'
    case 'hotkaishokk':
      return 'font-hotkaishokk'
    case 'hotgyoshokk':
      return 'font-hotgyoshokk'
    case 'hotgfkaishokk':
      return 'font-hotgfkaishokk'
    case 'hotgekai11kk':
      return 'font-hotgekai11kk'
    case 'kokuryu':
      return 'font-kokuryu'
    case 'shinryu':
      return 'font-shinryu'
    case 'dnpshueinminchostd':
      return 'font-dnpshueinminchostd'
    case 'dnpshueinshogominchostd':
      return 'font-dnpshueinshogominchostd'
    case 'tashizuku':
      return 'font-tashizuku'
    case 'tarehitsum':
      return 'font-tarehitsum'
    case 'tapoptomo':
      return 'font-tapoptomo'
    case 'tapopkaku':
      return 'font-tapopkaku'
    case 'taoonishi':
      return 'font-taoonishi'
    case 'takobe':
      return 'font-takobe'
    case 'tanasubi':
      return 'font-tanasubi'
    case 'tamiyabi':
      return 'font-tamiyabi'
    case 'abtsurara':
      return 'font-abtsurara'
    case 'abtoria':
      return 'font-abtoria'
    case 'abtombobold':
      return 'font-abtombobold'
    case 'abryushichi':
      return 'font-abryushichi'
    case 'abryusenaki':
      return 'font-abryusenaki'
    case 'abmegadot9':
      return 'font-abmegadot9'
    case 'abkinmokuseikuro':
      return 'font-abkinmokuseikuro'
    case 'abhanamaki':
      return 'font-abhanamaki'
    case 'abaotama':
      return 'font-abaotama'
    case 'abanzur':
      return 'font-abanzur'
    case 'abaki':
      return 'font-abaki'
    case 'tbudminchostd':
      return 'font-tbudminchostd'
    case 'tbudrgothicstd':
      return 'font-tbudrgothicstd'
    case 'tbudgothicstd':
      return 'font-tbudgothicstd'
    case 'aotfudshingocon80pr6n':
      return 'font-aotfudshingocon80pr6n'
    case 'aotfgothicmb101pr6n':
      return 'font-aotfgothicmb101pr6n'
    case 'yugothicpr6n':
      return 'font-yugothicpr6n'
    case 'uddigikyokashopro':
      return 'font-uddigikyokashopro'
    case 'setofontsp':
      return 'font-setofontsp'
    case 'oshidashimgothic':
      return 'font-oshidashimgothic'
    case 'oradanominchogsrr':
      return 'font-oradanominchogsrr'
    case 'timemachinewa':
      return 'font-timemachinewa'
    case 'kurobaracinderella':
      return 'font-kurobaracinderella'
    case 'rondeb':
      return 'font-rondeb'
    case 'poprumcute':
      return 'font-poprumcute'
    case 'mitimasu':
      return 'font-mitimasu'
    case 'kaisotai':
      return 'font-kaisotai'
    case 'isemin':
      return 'font-isemin'
    case 'isego':
      return 'font-isego'
    case 'genkaimincho':
      return 'font-genkaimincho'
    case 'honokamarugothic':
      return 'font-honokamarugothic'
    case 'honokaantiquemaru':
      return 'font-honokaantiquemaru'
    case 'fotudmarugosmallpr6n':
      return 'font-fotudmarugosmallpr6n'
    case 'fottsukuaoldminpr6n':
      return 'font-fottsukuaoldminpr6n'
    case 'fottsukuminpr6n':
      return 'font-fottsukuminpr6n'
    case 'fotudkakugosmallpr6n':
      return 'font-fotudkakugosmallpr6n'
    case 'fotudkakugoc80pro':
      return 'font-fotudkakugoc80pro'
    case 'fotudkakugoc70pro':
      return 'font-fotudkakugoc70pro'
    case 'fotudkakugoc60pro':
      return 'font-fotudkakugoc60pro'
    case 'fotchiarostd':
      return 'font-fotchiarostd'
    case 'fotudminchopr6n':
      return 'font-fotudminchopr6n'
    case 'bokutohrera':
      return 'font-bokutohrera'
    case 'abajiminkoheb':
      return 'font-abajiminkoheb'
    case 'wanpakurera':
      return 'font-wanpakurera'
    case 'nitalagoruika':
      return 'font-nitalagoruika'
    case 'nitalagorera':
      return 'font-nitalagorera'
    case 'septembern':
      return 'font-septembern'
    case 'capirera':
      return 'font-capirera'
    case 'bokutohruika':
      return 'font-bokutohruika'
    case 'happyruika':
      return 'font-happyruika'
    case 'wanpakuruika':
      return 'font-wanpakuruika'
    case 'ruika':
      return 'font-ruika'
    case 'rera':
      return 'font-rera'
    case 'abyoshienoryokandb':
      return 'font-abyoshienoryokandb'
    case 'abyoshienoryokanm':
      return 'font-abyoshienoryokanm'
    case 'abyoshienoryokanb':
      return 'font-abyoshienoryokanb'
    case 'abajiminsyuleb':
      return 'font-abajiminsyuleb'
    case 'absekka':
      return 'font-absekka'
    case 'abajiminsyuveb':
      return 'font-abajiminsyuveb'
    case 'abtyuusyobokunenn':
      return 'font-abtyuusyobokunenn'
    case 'abajiminmchikuceb':
      return 'font-abajiminmchikuceb'
    case 'abpolcadot':
      return 'font-abpolcadot'
    case 'abajiminmsyueb':
      return 'font-abajiminmsyueb'
    case 'abajiminmmineb':
      return 'font-abajiminmmineb'
    case 'abtsurumaru':
      return 'font-abtsurumaru'
    case 'abajiminmsyuleb':
      return 'font-abajiminmsyuleb'
    case 'abtanteidan':
      return 'font-abtanteidan'
    case 'abajiminmsyuveb':
      return 'font-abajiminmsyuveb'
    case 'abyurumin':
      return 'font-abyurumin'
    case 'abajiminmryoeb':
      return 'font-abajiminmryoeb'
    case 'abshiguma':
      return 'font-abshiguma'
    case 'abajiminsoeb':
      return 'font-abajiminsoeb'
    case 'abryusenfuyu':
      return 'font-abryusenfuyu'
    case 'abajiminmkoheb':
      return 'font-abajiminmkoheb'
    case 'absanpobito':
      return 'font-absanpobito'
    case 'abajiminmgyoeb':
      return 'font-abajiminmgyoeb'
    case 'abneuron':
      return 'font-abneuron'
    case 'abajiminmsoeb':
      return 'font-abajiminmsoeb'
    case 'abajiminryoeb':
      return 'font-abajiminryoeb'
    case 'abajimingyoeb':
      return 'font-abajimingyoeb'
    case 'abajiminmchikueb':
      return 'font-abajiminmchikueb'
    case 'abshoutenmaru':
      return 'font-abshoutenmaru'
    case 'abajiminsyueb':
      return 'font-abajiminsyueb'
    case 'abroman':
      return 'font-abroman'
    case 'abajiminmineb':
      return 'font-abajiminmineb'
    case 'abajiminchikueb':
      return 'font-abajiminchikueb'
    case 'abajiminchikuceb':
      return 'font-abajiminchikuceb'
    case 'abkotodamau':
      return 'font-abkotodamau'
    case 'tafugafude':
      return 'font-tafugafude'
    case 'abitaikoku':
      return 'font-abitaikoku'
    case 'tayugemeijin':
      return 'font-tayugemeijin'
    case 'abhasefude':
      return 'font-abhasefude'
    case 'takoigokoro':
      return 'font-takoigokoro'
    case 'abmayuminwalk':
      return 'font-abmayuminwalk'
    case 'abkotatsu':
      return 'font-abkotatsu'
    case 'tayuka':
      return 'font-tayuka'
    case 'abnara':
      return 'font-abnara'
    case 'takasanemarugo':
      return 'font-takasanemarugo'
    case 'abquadra':
      return 'font-abquadra'
    case 'taengeifude':
      return 'font-taengeifude'
    case 'abkokorono2':
      return 'font-abkokorono2'
    case 'tamadam':
      return 'font-tamadam'
    case 'tasouiimei':
      return 'font-tasouiimei'
    case 'takakushadow':
      return 'font-takakushadow'
    case 'taaki':
      return 'font-taaki'
    case 'abmarusan':
      return 'font-abmarusan'
    case 'tadansyaku':
      return 'font-tadansyaku'
    case 'abomusubi':
      return 'font-abomusubi'
    case 'abhasemomor':
      return 'font-abhasemomor'
    case 'abkirigirisu':
      return 'font-abkirigirisu'
    case 'abkotsubu':
      return 'font-abkotsubu'
    case 'abcountryroad':
      return 'font-abcountryroad'
    case 'absuzume':
      return 'font-absuzume'
    case 'abkirakul':
      return 'font-abkirakul'
    case 'abplus':
      return 'font-abplus'
    case 'abdonmai':
      return 'font-abdonmai'
    case 'abkumikib':
      return 'font-abkumikib'
    case 'abgagakub':
      return 'font-abgagakub'
    case 'abkikori':
      return 'font-abkikori'
    case 'abbooing':
      return 'font-abbooing'
    case 'abkesera':
      return 'font-abkesera'
    case 'abbabywalk':
      return 'font-abbabywalk'
    case 'abdigicomb':
      return 'font-abdigicomb'
    case 'abintore':
      return 'font-abintore'
    case 'abkarutabold':
      return 'font-abkarutabold'
    case 'abdoramin':
      return 'font-abdoramin'
    case 'vdlkuromincho':
      return 'font-vdlkuromincho'
    case 'vdlpenletter':
      return 'font-vdlpenletter'
    case 'vdlgothicmincho':
      return 'font-vdlgothicmincho'
    case 'yamamotoanstdn':
      return 'font-yamamotoanstdn'
    case 'yamamotoanclassicstdn':
      return 'font-yamamotoanclassicstdn'
    case 'kinutamaruminyoshinostdn':
      return 'font-kinutamaruminyoshinostdn'
    case 'kinutamarumintikumastdn':
      return 'font-kinutamarumintikumastdn'
    case 'kinutamaruminshinanostdn':
      return 'font-kinutamaruminshinanostdn'
    case 'kinutamaruminoldstdn':
      return 'font-kinutamaruminoldstdn'
    case 'kinutamaruminkisostdn':
      return 'font-kinutamaruminkisostdn'
    case 'kinutamaruminkaturastdn':
      return 'font-kinutamaruminkaturastdn'
    case 'kinutamaruminfujistdn':
      return 'font-kinutamaruminfujistdn'
    case 'iroha32sakurastdn':
      return 'font-iroha32sakurastdn'
    case 'iroha31nirestdn':
      return 'font-iroha31nirestdn'
    case 'iroha30momijistdn':
      return 'font-iroha30momijistdn'
    case 'iroha29umestdn':
      return 'font-iroha29umestdn'
    case 'iroha28kiristdn':
      return 'font-iroha28kiristdn'
    case 'iroha27keyakistdn':
      return 'font-iroha27keyakistdn'
    case 'iroha26tubakistdn':
      return 'font-iroha26tubakistdn'
    case 'iroha25ichostdn':
      return 'font-iroha25ichostdn'
    case 'iroha24matustdn':
      return 'font-iroha24matustdn'
    case 'iroha23kaedestdn':
      return 'font-iroha23kaedestdn'
    case 'iroha22momistdn':
      return 'font-iroha22momistdn'
    case 'iroha21popurastdn':
      return 'font-iroha21popurastdn'
    case 'toppanbunkyuminchopr6n':
      return 'font-toppanbunkyuminchopr6n'
    case 'toppanbunkyumidashiminst':
      return 'font-toppanbunkyumidashiminst'
    case 'toppanbunkyumidashigostd':
      return 'font-toppanbunkyumidashigostd'
    case 'tarb':
      return 'font-tarb'
    case 'takouran':
      return 'font-takouran'
    case 'takotodamar':
      return 'font-takotodamar'
    case 'takairegular':
      return 'font-takairegular'
    case 'tahougank500':
      return 'font-tahougank500'
    case 'tahoudatem500':
      return 'font-tahoudatem500'
    case 'taf1blockline':
      return 'font-taf1blockline'
    case 'tacandy':
      return 'font-tacandy'
    case 'vdlyotag':
      return 'font-vdlyotag'
    case 'vdlterag':
      return 'font-vdlterag'
    case 'vdlpetag':
      return 'font-vdlpetag'
    case 'vdlpenlady':
      return 'font-vdlpenlady'
    case 'vdlpengentle':
      return 'font-vdlpengentle'
    case 'vdlmegamaru':
      return 'font-vdlmegamaru'
    case 'vdlmegag':
      return 'font-vdlmegag'
    case 'vdllogona':
      return 'font-vdllogona'
    case 'vdllogojrblack':
      return 'font-vdllogojrblack'
    case 'vdllogomaru':
      return 'font-vdllogomaru'
    case 'vdllogomarujr':
      return 'font-vdllogomarujr'
    case 'vdlgigamaru':
      return 'font-vdlgigamaru'
    case 'vdllogojr':
      return 'font-vdllogojr'
    case 'vdllogog':
      return 'font-vdllogog'
    case 'vdllinegr':
      return 'font-vdllinegr'
    case 'vdllineg':
      return 'font-vdllineg'
    case 'vdlkyosensya':
      return 'font-vdlkyosensya'
    case 'vdlgigamarujr':
      return 'font-vdlgigamarujr'
    case 'vdlgigajr':
      return 'font-vdlgigajr'
    case 'vdlgigag':
      return 'font-vdlgigag'
    case 'vdladmin':
      return 'font-vdladmin'
    case 'fotseuratpron':
      return 'font-fotseuratpron'
    case 'fotrodinpron':
      return 'font-fotrodinpron'
    case 'fotmatissepron':
      return 'font-fotmatissepron'
    case 'fotcezannepron':
      return 'font-fotcezannepron'
    case 'yuminchopr6n':
      return 'font-yuminchopr6n'
    case 'dnpshueiantistd':
      return 'font-dnpshueiantistd'
    case 'dnpshuei4gobstd':
      return 'font-dnpshuei4gobstd'
    case 'dnpshuei4gostd':
      return 'font-dnpshuei4gostd'
    case 'dnpshueishogominchostd':
      return 'font-dnpshueishogominchostd'
    case 'heiseikakugothicstdn':
      return 'font-heiseikakugothicstdn'
    case 'heiseiminchostdn':
      return 'font-heiseiminchostdn'
    case 'kazurakisp2n':
      return 'font-kazurakisp2n'
    default:
      return 'font-notosansjp'
  }
}

const fontWeightClassName = (fontWeight: number) => {
  switch (fontWeight) {
    case 100:
      return 'font-thin'
    case 200:
      return 'font-extralight'
    case 300:
      return 'font-light'
    case 400:
      return 'font-normal'
    case 500:
      return 'font-medium'
    case 600:
      return 'font-semibold'
    case 700:
      return 'font-bold'
    case 800:
      return 'font-extrabold'
    case 900:
      return 'font-black'
    default:
      return 'font-normal'
  }
}

const Home: NextPage = ({}) => {
  const [image, setImage] = useState('')
  const [cropper, setCropper] = useState<any>()
  const [text, setText] = useState('')
  const [fonts, setFonts] = useState<PredictFont[]>([])
  const [loading, setLoading] = useState(false)
  const [submitCount, setSubmitCount] = useState(0) // 送信されたときに useEffect走るように（countじゃくていいのだが…）
  const firstRender = useRef(true)
  const [croppedImage, setCroppedImage] = useState('')
  const [selectedFont, setSelectedFont] = useState<PredictFont>({
    fontName: 'notosansjp',
    fontNameJa: 'Noto Sans Japanese',
    fontNameEn: 'Noto Sans Japanese',
    fontWeight: 400,
    type: 'google',
    adobeId: '',
    score: 1.0,
  })
  const [errorOcr, setErrorOcr] = useState(false)
  const [errorVfr, setErrorVfr] = useState(false)
  const [timeoutVfr, setTimeoutVfr] = useState(false)
  const [loadAdobeFontsNum, setLoadAdobeFontsNum] = useState(0)
  const loadAdobeFonts = useRef<string[]>([])

  const displayFontName = selectedFont
    ? selectedFont.fontNameJa +
      ' ' +
      fontWeightClassName(selectedFont.fontWeight).replace('font-', '') +
      '-' +
      selectedFont.fontWeight
    : ''
  const displayText = errorOcr
    ? 'サンプル文字です'
    : Boolean(text)
    ? text
    : '＼(^o^)／'

  const fontModalKey = 'font-modal'

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      return
    }
    if (!doneSubmit()) {
      return
    }
    getCropData()
  }, [submitCount])

  const doneSubmit = () => {
    return Boolean(submitCount)
  }

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader()
      reader.addEventListener('load', () => {
        setImage(reader.result?.toString() || '')
      })
      reader.readAsDataURL(e.target.files[0])
    }
  }

  const getCropData = async () => {
    // console.log(cropper.getCroppedCanvas().toDataURL())
    // typeは検討
    // https://developer.mozilla.org/ja/docs/Web/API/HTMLCanvasElement/toDataURL
    setLoading(true)
    setCroppedImage(cropper.getCroppedCanvas().toDataURL())

    const encodedImage = cropper
      .getCroppedCanvas()
      .toDataURL()
      .replace(/^data:image\/(png|jpg);base64,/, '')

    const fontSearchHeaders = new Headers()
    fontSearchHeaders.append('Content-Type', 'application/json')
    fontSearchHeaders.append(
      'x-api-key',
      process.env.NEXT_PUBLIC_FONT_SEARCH_API_KEY
    )
    const fontSearchBody = JSON.stringify({
      content: encodedImage,
    })

    const ocrHeaders = new Headers()
    ocrHeaders.append('Content-Type', 'application/json')
    const ocrBody = JSON.stringify({
      requests: [
        {
          image: { content: encodedImage },
          features: [{ type: 'TEXT_DETECTION' }],
        },
      ],
    })

    const controller = new AbortController()
    const timeout = setTimeout(() => {
      controller.abort()
    }, abortTime)

    try {
      const response = await fetch(fontSearchApiEndpoint, {
        method: 'POST',
        headers: fontSearchHeaders,
        body: fontSearchBody,
        signal: controller.signal,
      })

      if (response.ok) {
        const data = await response.json()
        setFonts(data.fonts)

        const detectedText = data.text
        const slicedText =
          detectedText.length <= maxChars
            ? detectedText
            : detectedText.slice(0, maxChars)
        setText(slicedText)
        setErrorVfr(false)
        setErrorOcr(false)
        setTimeoutVfr(false)
        // 400番台
        // 基本OCRのエラー
      } else {
        setErrorOcr(true)
      }
      // 500番台
    } catch (e) {
      if (e instanceof Error && e.name == 'AbortError') {
        setTimeoutVfr(true)
      }
      setErrorVfr(true)
    } finally {
      clearTimeout(timeout)
      setLoading(false)
    }
  }

  const fontNamePattern = /^wf-.+-active$/
  if (typeof document !== 'undefined') {
    const target = document.getElementsByTagName('html')[0]

    // オブザーバインスタンスを作成
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        const element = mutation.target as HTMLElement
        element.classList.forEach((value) => {
          if (fontNamePattern.test(value.trim())) {
            const fontFamilyWithWeight = value.split('-').slice(1, -1).join('')
            const beforeNum = loadAdobeFonts.current.length
            loadAdobeFonts.current = Array.from(
              new Set(loadAdobeFonts.current.concat([fontFamilyWithWeight]))
            )
            if (beforeNum !== loadAdobeFonts.current.length) {
              setLoadAdobeFontsNum(loadAdobeFonts.current.length)
            }
          }
        })
      })
    })

    // オブザーバの設定
    const config = {
      attributes: true,
      attributeFilter: ['class'],
    }

    // 対象ノードとオブザーバの設定を渡す
    observer.observe(target, config)
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>フォントピント | 画像から日本語フォントを検索できるサイト</title>
      </Head>

      <GoogleAnalytics />

      {Boolean(fonts) &&
        fonts.map((font, index) => {
          // adobe fontsかつまだ読み込まれていないフォントをロード
          if (
            font.type === 'adobe' &&
            !loadAdobeFonts.current.includes(
              `${font.fontName}n${(font.fontWeight / 100).toString()}`
            )
          ) {
            return (
              <Script
                key={index}
                dangerouslySetInnerHTML={{
                  __html: `
                (function(d) {
                  var config = {
                    kitId: '${font.adobeId}',
                    scriptTimeout: 3000,
                    async: true
                  },
                  h=d.documentElement,t=setTimeout(function(){h.className=h.className.replace(/\bwf-loading\b/g,"")+" wf-inactive";},config.scriptTimeout),tk=d.createElement("script"),f=false,s=d.getElementsByTagName("script")[0],a;h.className+=" wf-loading";tk.src='https://use.typekit.net/'+config.kitId+'.js';tk.async=true;tk.onload=tk.onreadystatechange=function(){a=this.readyState;if(f||a&&a!="complete"&&a!="loaded")return;f=true;clearTimeout(t);try{Typekit.load(config)({active: function() {console.log("aa")}})}catch(e){}};s.parentNode.insertBefore(tk,s)
                })(document);
                `,
                }}
                strategy="afterInteractive"
              />
            )
          }
          // google fontsかつまだ読み込まれていないフォントをロード
          if (
            font.type === 'google' &&
            !loadAdobeFonts.current.includes(
              `${font.fontName}n${(font.fontWeight / 100).toString()}`
            )
          ) {
            return (
              <Script
                key={index}
                dangerouslySetInnerHTML={{
                  __html: `
                  WebFontConfig = {
                    google: {
                      families: ['${
                        font.fontNameEn
                      }:${font.fontWeight.toString()}'],
                      text: '${displayText}'
                    },
                    timeout: 3000
                 };
              
                 (function(d) {
                    var wf = d.createElement('script'), s = d.scripts[0];
                    wf.src = 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js';
                    wf.async = true;
                    s.parentNode.insertBefore(wf, s);
                 })(document);
                `,
                }}
                strategy="afterInteractive"
              />
            )
          }
        })}

      <main className="flex w-full flex-1 flex-col items-center px-8 pt-10 text-center">
        {!Boolean(image) && (
          <>
            <h1 className="pb-5 text-3xl">{title}</h1>
            <div className="pb-14 text-center text-lg">
              <p>画像中のテキストに似ている</p>
              <p>日本語フォントを探します</p>
            </div>
          </>
        )}
        <div className="mb-4">
          <ImageUploader onChange={onSelectFile} hasImage={Boolean(image)} />
        </div>

        {!Boolean(image) && (
          <div className="balloon">
            <p>対応フォント数365</p>
          </div>
        )}

        {Boolean(image) && (
          <Cropper
            src={image}
            className="h-72 w-full md:h-96 md:w-156"
            zoomTo={0.1}
            initialAspectRatio={1}
            viewMode={1}
            responsive={true}
            autoCropArea={1}
            autoCrop={true}
            checkOrientation={true}
            onInitialized={(instance) => {
              setCropper(instance)
            }}
            guides={true}
          />
        )}

        {Boolean(image) && (
          <>
            <label
              htmlFor="example-modal"
              className="modal-button cursor-pointer pt-1 text-lg text-indigo-500 underline hover:text-indigo-800"
            >
              良い例と悪い例
            </label>

            <div>
              <button
                className="btn btn-lg mt-4"
                onClick={() => setSubmitCount(submitCount + 1)}
              >
                検索
              </button>
            </div>
          </>
        )}

        {loading ? (
          <Loading />
        ) : errorVfr ? (
          timeoutVfr ? (
            <div className="py-4">
              <Image
                src={niwatori}
                width={100}
                height={100}
                objectFit="contain"
              />
              <p className="text-lg font-bold">数分後にお試しください</p>
              <p className="text-lg font-bold">
                （タイミングによって遅いときがあります）
              </p>
            </div>
          ) : (
            <div className="py-4">
              <Image
                src={niwatori}
                width={100}
                height={100}
                objectFit="contain"
              />
              <p className="text-lg font-bold">何かエラー起きちゃいました</p>
            </div>
          )
        ) : errorOcr ? (
          <div className="pt-4">
            <Image
              src={niwatori}
              width={100}
              height={100}
              objectFit="contain"
            />
            <p className="text-lg font-bold">文字を認識できませんでした</p>
            <p className="text-lg font-bold">
              （トリミングの範囲を大きくすると上手くいく場合があります）
            </p>
          </div>
        ) : (
          Boolean(fonts) &&
          fonts.map((font, index) => (
            <label
              key={index}
              className="my-1 w-80 animate-fade-in-up cursor-pointer rounded-lg bg-white py-4 px-4 shadow-lg transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-105 md:w-100 md:px-8"
              onClick={() => setSelectedFont(font)}
              htmlFor={fontModalKey}
            >
              <div>
                {!loadAdobeFonts.current.includes(
                  `${font.fontName}n${(font.fontWeight / 100).toString()}`
                ) ? (
                  <FontLoading />
                ) : (
                  <p
                    className={`mt-2 text-3xl md:text-5xl ${fontWeightClassName(
                      font.fontWeight
                    )} ${fontClassName(font.fontName)}`}
                  >
                    {displayText}
                  </p>
                )}
              </div>
              <div className="mt-2 flex justify-end md:mt-4">
                <p className="text-md font-normal text-gray-400 md:text-lg">
                  {font.fontNameJa}{' '}
                  {fontWeightClassName(font.fontWeight).replace('font-', '')}-
                  {font.fontWeight}
                </p>
              </div>
            </label>
          ))
        )}

        <div className="pt-16">
          <Share />
        </div>

        <div className="pt-6">
          <BuyMeACoffee />
        </div>

        <FontModal
          id={fontModalKey}
          fontName={displayFontName}
          img={croppedImage}
          styleFont={fontClassName(selectedFont.fontName)}
          styleFontWeight={fontWeightClassName(selectedFont.fontWeight)}
          text={displayText}
        />

        <ExampleModal />
      </main>
      <Footer />
    </div>
  )
}

export default Home
