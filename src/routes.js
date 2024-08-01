import PersonalPage from "./PersonelYonetim/personelPage";
import Dashboard from "./page/Dashboard";
import EnvanterPage from "./EnvanterYonetim/envanterPage";
import ZimmetPage from "./ZimmetYonetim/zimmetPage";
import PersonelSearchPage from "./PersonelYonetim/PersonelSearchPage";
import Login from "./Login/login";
import ZimmetDetailPage from "./ZimmetYonetim/ZimmetDetailPage";

const routes = [
  { path: "/", exact: true, name: "Anasayfa", component: Dashboard },
  { path: "/personel-page", name: "Personel Listesi", component: PersonalPage },
  { path: "/envanter-page", name: "Envanter Listesi", component: EnvanterPage },
  { path: "/zimmet-page", name: "Zimmet Listesi", component: PersonelSearchPage },
  { path: "/zimmetYonetim-page", name: "Zimmet Yönetim", component: ZimmetPage },
  { path: "/zimmet/personel/zimmet", name: "Detail", component: ZimmetDetailPage ,isVisible:true},
];

export default routes;
