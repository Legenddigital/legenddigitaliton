import { KeyBlueButton } from "buttons";
import { ShowError } from "shared";
import { FormattedMessage as T } from "react-intl";
import { getLddldLastLogLine, getDcrwalletLastLogLine } from "wallet";
import ReactTimeout from "react-timeout";
import "style/GetStarted.less";

function parseLogLine(line) {
  const res = /^[\d :\-.]+ \[...\] (.+)$/.exec(line);
  return res ? res[1] : "";
}

const LastLogLinesFragment = ({ lastLddldLogLine, lastDcrwalletLogLine }) => (
  <div className="get-started-last-log-lines">
    <div className="last-lddld-log-line">{lastLddldLogLine}</div>
    <div className="last-lddlwallet-log-line">{lastDcrwalletLogLine}</div>
  </div>
);

const StartupErrorFragment = ({ onRetryStartRPC }) => (
  <div className="advanced-page-form">
    <div className="advanced-daemon-row">
      <ShowError className="get-started-error" error="Connection to lddld failed, please try and reconnect." />
    </div>
    <div className="loader-bar-buttons">
      <KeyBlueButton className="get-started-rpc-retry-button" onClick={onRetryStartRPC}>
        <T id="getStarted.retryBtn" m="Retry" />
      </KeyBlueButton>
    </div>
  </div>
);

@autobind
class StartRPCBody extends React.Component {

  constructor(props) {
    super(props);
    this.state = { lastLddldLogLine: "", lastDcrwalletLogLine: "" };
  }

  componentDidMount() {
    this.props.setInterval(() => {
      Promise
        .all([ getLddldLastLogLine(), getDcrwalletLastLogLine() ])
        .then(([ lddldLine, lddlwalletLine ]) => {
          const lastLddldLogLine = parseLogLine(lddldLine);
          const lastDcrwalletLogLine = parseLogLine(lddlwalletLine);
          if ( lastLddldLogLine !== this.state.lastLddldLogLine ||
              lastDcrwalletLogLine !== this.state.lastDcrwalletLogLine)
          {
            this.setState({ lastLddldLogLine, lastDcrwalletLogLine });
          }
        });
    }, 2000);
  }

  render () {
    const { startupError, getCurrentBlockCount } = this.props;

    return (
      <Aux>
        {!getCurrentBlockCount && <LastLogLinesFragment {...this.state} />}
        {startupError && <StartupErrorFragment {...this.props} />}
      </Aux>
    );
  }
}

export default ReactTimeout(StartRPCBody);
