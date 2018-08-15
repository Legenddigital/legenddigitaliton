import { FormattedMessage as T } from "react-intl";
import { Tooltip } from "shared";
import { HelpLink, HelpLinkInfoModal } from "buttons";
import { ConstitutionModalContent } from "modals";
import { DescriptionHeader } from "layout";
import "style/Help.less";

export const LinksTabHeader = () =>
  <DescriptionHeader
    description={<T id="help.description.links" m="If you have any difficulty with legenddigitaliton, please use the following links to help find a solution." />}
  />;

export const LinksTab = () => (
  <div className="help-icons-list">
    <HelpLink className={"help-github-icon"} href="https://github.com/legenddigital/legenddigitaliton"><T id="help.github" m="Github" /></HelpLink>
    <HelpLink className={"help-docs-icon"} href="https://docs.legenddigital.org/"><T id="help.documentation" m="Documentation" /></HelpLink>
    <HelpLink className={"help-stakepools-icon"} href="https://legenddigital.org/stakepools"><T id="help.stakepools" m=" Stakepools" /></HelpLink>
    <HelpLink className={"help-rocketchat-icon"} href="https://rocketchat.legenddigital.org"><T id="help.rocketchat" m="RocketChat" /></HelpLink>
    <Tooltip text={ <T id="help.matrix.info" m="Use matrix.legenddigital.org as your custom server URL." /> }><HelpLink className={"help-matrix-icon"} href="https://riot.im/app/#/login"><T id="help.matrix" m="Matrix Chat" /></HelpLink></Tooltip>
    <HelpLink className={"help-freenode-icon"} href="https://webchat.freenode.net/?channels=legenddigital&uio=d4"><T id="help.freenode" m="Freenode" /></HelpLink>
    <HelpLink className={"help-forum-icon"} href="https://forum.legenddigital.org"><T id="help.forum" m="Forum" /> </HelpLink>
    <HelpLinkInfoModal className={"help-constitution-icon"}
      modalTitle={<h1><T id="help.constitution.modal.title" m="Legenddigital Constitution" /></h1>}
      modalContent={<ConstitutionModalContent />}
      buttonLabel={<T id="help.constitution" m="Constitution" />}
    />
  </div>
);
