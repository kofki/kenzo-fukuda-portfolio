import type { Icon } from "@phosphor-icons/react/dist/lib/types";
import type { IconName } from "@/types";

// Per-icon SSR imports (RSC-friendly, no Phosphor context, minimal bundle).
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
import { SparkleIcon } from "@phosphor-icons/react/dist/ssr/Sparkle";
import { TrophyIcon } from "@phosphor-icons/react/dist/ssr/Trophy";
import { ListIcon } from "@phosphor-icons/react/dist/ssr/List";
import { XIcon } from "@phosphor-icons/react/dist/ssr/X";

/** Single source of truth — swap the icon library here without touching data. */
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
  sparkle: SparkleIcon,
  trophy: TrophyIcon,
  menu: ListIcon,
  close: XIcon,
};

export type { Icon };
