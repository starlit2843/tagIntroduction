import SCSR from "~/assets/icon/apps/SCSR.png";
import SorN from "~/assets/icon/apps/maze.png";
import NCCUStudent from "~/assets/icon/apps/nccu-student.png";
import NCCUExamFB from "~/assets/icon/apps/NCCUExamExchangeFBGroup.png";
import NCCUSA from "~/assets/icon/apps/NCCUSA_black.png";
import NCCUSC from "~/assets/icon/apps/nccu-sc.png";
import NCCUPass from "~/assets/icon/apps/NCCUPassLogo.png";
import GPA from "~/assets/icon/apps/gpa.png";
import Eat from "~/assets/icon/apps/eat.png";
import CopyChecker from "~/assets/icon/apps/copy-checker.png";
import GForms from "~/assets/icon/apps/GoogleForms.png";
import GithubNumo from "~/assets/icon/apps/GithubNumo.png";
import DiscordNumo from "~/assets/icon/apps/DiscordNumo.png";
import SCSRManual from "~/assets/icon/apps/scsr-manual.png";
import UXReport from "~/assets/icon/apps/ux-report.png";
import UXProto from "~/assets/icon/apps/ux-proto.png";
import Instagram from "~/assets/icon/apps/Instagram.png";
import Status from "~/assets/icon/apps/open-status.png";

const featureList: { [key: string]: CommonlyUsedType[] } = {
  政大生活: [
    {
      name: "政大交流版",
      to: "https://www.facebook.com/groups/NCCUSTUDENT",
      imgSrc: NCCUStudent,
    },
    {
      name: "政大吃什麼\n（封測中）",
      to: "/apps/what2eat",
      imgSrc: Eat,
      newTab: false,
    },
    {
      name: "南棟還是北棟",
      to: "/apps/south-or-north/breakfast",
      imgSrc: SorN,
      newTab: false,
    },
  ],
  課程工具: [
    {
      name: "Open NCCU\n排課系統",
      to: "https://course.opennccu.com/",
      imgSrc: SCSR,
    },
    {
      name: "批量選課助手",
      to: "https://help.opennccu.com",
      imgSrc: CopyChecker,
    },
    {
      name: "排課系統操作手冊",
      to: "https://opennccu.notion.site/open-nccu-518768c94b0b4d64a82a06811a865207",
      imgSrc: SCSRManual,
    },
    {
      name: "GPA 計算機",
      to: "/apps/gpa",
      imgSrc: GPA,
      newTab: false,
    },
  ],
  合作夥伴: [
    {
      name: "政大考古題版",
      to: "https://www.facebook.com/groups/911331909223175",
      imgSrc: NCCUExamFB,
    },
    {
      name: "政大學生會",
      to: "https://www.facebook.com/NCCUSA4U/",
      imgSrc: NCCUSA,
    },
    {
      name: "政大學生議會",
      to: "https://sites.google.com/site/nccusp4u/home",
      imgSrc: NCCUSC,
    },
    {
      name: "政大通",
      to: "applinks://nccupass.com",
      imgSrc: NCCUPass,
    },
  ],
  政大系統開放指南: [
    {
      name: "場地借用系統\n體驗報告",
      to: "https://opennccu.notion.site/open-nccu-8dacf5d32ad2450592262fb28e3e4ab1",
      imgSrc: UXReport,
    },
    {
      name: "場地借用系統\n設計提案原型",
      to: "https://www.figma.com/proto/yrB1ikJxPiJop8YDJt1qJA/%E6%94%BF%E5%A4%A7%E5%A0%B4%E5%9C%B0%E7%94%B3%E8%AB%8B%E7%B3%BB%E7%B5%B1%E5%86%8D%E8%A8%AD%E8%A8%88%E5%8E%9F%E5%9E%8B%EF%BC%88%E5%85%AC%E9%96%8B%EF%BC%89?node-id=238-1876&starting-point-node-id=238%3A1876&show-proto-sidebar=1&scaling=scale-down&content-scaling=fixed&t=t2WaYjk2xK06zt7k-1",
      imgSrc: UXProto,
    },
  ],
  "參與 Open NCCU 社群": [
    {
      name: "@open.nccu",
      to: "https://instagram.com/open.nccu",
      imgSrc: Instagram,
    },
    {
      name: "Discord 社群\n討論、許願",
      to: "https://discord.gg/epArwHVmpk",
      imgSrc: DiscordNumo,
    },
    {
      name: "問題意見回報獲得貢獻徽章！",
      to: "https://forms.gle/Un57LxddqjVBgr8j7",
      imgSrc: GForms,
    },
    {
      name: "服務狀態",
      to: "https://status.opennccu.com/",
      imgSrc: Status,
    },
    {
      name: "GitHub",
      to: "https://github.com/OpenNCCU",
      imgSrc: GithubNumo,
    },
  ],
};

export { featureList };
