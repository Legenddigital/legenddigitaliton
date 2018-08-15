import Logs from "./Page";
import { getLddldLogs, getDcrwalletLogs, getDecreditonLogs } from "wallet";
import { logging } from "connectors";
import { DescriptionHeader } from "layout";
import { FormattedMessage as T } from "react-intl";

export const LogsTabHeader = () =>
  <DescriptionHeader
    description={<T id="help.description.logs" m="Please find your current logs below to look for any issue or error you are having." />}
  />;
@autobind
class LogsTabBody extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
  }

  getInitialState() {
    return {
      lddldLogs: null,
      lddlwalletLogs: null,
      legenddigitalitonLogs: null,
    };
  }

  render() {
    const { showDecreditonLogs, showLddldLogs, showDcrwalletLogs,
      hideDecreditonLogs, hideLddldLogs, hideDcrwalletLogs
    } = this;
    const { isDaemonRemote, isDaemonStarted } = this.props;
    const {
      lddldLogs, lddlwalletLogs, legenddigitalitonLogs
    } = this.state;
    return (
      <Logs
        {...{
          ...this.props, ...this.state }}
        {...{
          showDecreditonLogs,
          showLddldLogs,
          showDcrwalletLogs,
          hideDecreditonLogs,
          hideLddldLogs,
          hideDcrwalletLogs,
          lddldLogs,
          lddlwalletLogs,
          legenddigitalitonLogs,
          isDaemonRemote,
          isDaemonStarted
        }}
      />
    );
  }

  showDecreditonLogs() {
    getDecreditonLogs()
      .then(logs => {
        this.setState({ legenddigitalitonLogs: Buffer.from(logs).toString("utf8") });
      })
      .catch(err => console.error(err));
  }

  hideDecreditonLogs() {
    this.setState({ legenddigitalitonLogs: null });
  }

  showLddldLogs() {
    getLddldLogs()
      .then(logs => {
        this.setState({ lddldLogs: Buffer.from(logs).toString("utf8") });
      })
      .catch(err => console.error(err));
  }

  hideLddldLogs() {
    this.setState({ lddldLogs: null });
  }

  showDcrwalletLogs() {
    getDcrwalletLogs()
      .then(logs => {
        this.setState({ lddlwalletLogs: Buffer.from(logs).toString("utf8") });
      })
      .catch(err => console.error(err));
  }

  hideDcrwalletLogs() {
    this.setState({ lddlwalletLogs: null });
  }
}

export const LogsTab = logging(LogsTabBody);
