import type { Icon } from "@phosphor-icons/react/dist/lib/types";
import type { IconName } from "@/types";

import { GithubLogoIcon } from "@phosphor-icons/react/dist/ssr/GithubLogo";
import { LinkedinLogoIcon } from "@phosphor-icons/react/dist/ssr/LinkedinLogo";
import { XLogoIcon } from "@phosphor-icons/react/dist/ssr/XLogo";
import { EnvelopeIcon } from "@phosphor-icons/react/dist/ssr/Envelope";
import { FileTextIcon } from "@phosphor-icons/react/dist/ssr/FileText";
import { ArrowSquareOutIcon } from "@phosphor-icons/react/dist/ssr/ArrowSquareOut";
import { PersonSimpleSwimIcon } from "@phosphor-icons/react/dist/ssr/PersonSimpleSwim";
import { PersonSimpleSnowboardIcon } from "@phosphor-icons/react/dist/ssr/PersonSimpleSnowboard";
import { GuitarIcon } from "@phosphor-icons/react/dist/ssr/Guitar";
import { MicrophoneStageIcon } from "@phosphor-icons/react/dist/ssr/MicrophoneStage";
import { VolleyballIcon } from "@phosphor-icons/react/dist/ssr/Volleyball";
import { SunIcon } from "@phosphor-icons/react/dist/ssr/Sun";
import { MoonIcon } from "@phosphor-icons/react/dist/ssr/Moon";
import { WavesIcon } from "@phosphor-icons/react/dist/ssr/Waves";
import { MapPinIcon } from "@phosphor-icons/react/dist/ssr/MapPin";
import { ArrowDownIcon } from "@phosphor-icons/react/dist/ssr/ArrowDown";
import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr/ArrowUpRight";
import { CodeIcon } from "@phosphor-icons/react/dist/ssr/Code";
import { ChartLineIcon } from "@phosphor-icons/react/dist/ssr/ChartLine";
import { TrophyIcon } from "@phosphor-icons/react/dist/ssr/Trophy";
import { ListIcon } from "@phosphor-icons/react/dist/ssr/List";
import { XIcon } from "@phosphor-icons/react/dist/ssr/X";
import { CircleHalfIcon } from "@phosphor-icons/react/dist/ssr/CircleHalf";
import { ArrowLeftIcon } from "@phosphor-icons/react/dist/ssr/ArrowLeft";
import { CaretRightIcon } from "@phosphor-icons/react/dist/ssr/CaretRight";
import { StackIcon } from "@phosphor-icons/react/dist/ssr/Stack";
import { CubeIcon } from "@phosphor-icons/react/dist/ssr/Cube";
import { DatabaseIcon } from "@phosphor-icons/react/dist/ssr/Database";
import { TerminalIcon } from "@phosphor-icons/react/dist/ssr/Terminal";
import { CpuIcon } from "@phosphor-icons/react/dist/ssr/Cpu";
import { GraduationCapIcon } from "@phosphor-icons/react/dist/ssr/GraduationCap";
import { BooksIcon } from "@phosphor-icons/react/dist/ssr/Books";
import { MedalIcon } from "@phosphor-icons/react/dist/ssr/Medal";
import { CertificateIcon } from "@phosphor-icons/react/dist/ssr/Certificate";
import { ScalesIcon } from "@phosphor-icons/react/dist/ssr/Scales";
import { CreditCardIcon } from "@phosphor-icons/react/dist/ssr/CreditCard";
import { DeviceMobileIcon } from "@phosphor-icons/react/dist/ssr/DeviceMobile";
import { AppStoreLogoIcon } from "@phosphor-icons/react/dist/ssr/AppStoreLogo";
import { GooglePlayLogoIcon } from "@phosphor-icons/react/dist/ssr/GooglePlayLogo";
import { LightbulbIcon } from "@phosphor-icons/react/dist/ssr/Lightbulb";
import { TargetIcon } from "@phosphor-icons/react/dist/ssr/Target";
import { PathIcon } from "@phosphor-icons/react/dist/ssr/Path";
import { RocketIcon } from "@phosphor-icons/react/dist/ssr/Rocket";
import { BrainIcon } from "@phosphor-icons/react/dist/ssr/Brain";

export const icons: Record<IconName, Icon> = {
  github: GithubLogoIcon,
  linkedin: LinkedinLogoIcon,
  twitter: XLogoIcon,
  email: EnvelopeIcon,
  resume: FileTextIcon,
  external: ArrowSquareOutIcon,
  surf: PersonSimpleSwimIcon,
  skate: PersonSimpleSnowboardIcon,
  guitar: GuitarIcon,
  sing: MicrophoneStageIcon,
  volleyball: VolleyballIcon,
  sun: SunIcon,
  moon: MoonIcon,
  wave: WavesIcon,
  mapPin: MapPinIcon,
  arrowDown: ArrowDownIcon,
  arrowUpRight: ArrowUpRightIcon,
  code: CodeIcon,
  chartLine: ChartLineIcon,
  trophy: TrophyIcon,
  menu: ListIcon,
  close: XIcon,
  auto: CircleHalfIcon,
  arrowLeft: ArrowLeftIcon,
  caretRight: CaretRightIcon,
  stack: StackIcon,
  cube: CubeIcon,
  database: DatabaseIcon,
  terminal: TerminalIcon,
  cpu: CpuIcon,
  graduationCap: GraduationCapIcon,
  books: BooksIcon,
  medal: MedalIcon,
  certificate: CertificateIcon,
  scales: ScalesIcon,
  creditCard: CreditCardIcon,
  deviceMobile: DeviceMobileIcon,
  appStore: AppStoreLogoIcon,
  googlePlay: GooglePlayLogoIcon,
  lightbulb: LightbulbIcon,
  target: TargetIcon,
  path: PathIcon,
  rocket: RocketIcon,
  brain: BrainIcon,
};

export type { Icon };
