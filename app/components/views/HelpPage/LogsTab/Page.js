import { FormattedMessage as T } from "react-intl";
import "style/Logs.less";

const Logs = ({
  showLddldLogs,
  showDcrwalletLogs,
  hideLddldLogs,
  hideDcrwalletLogs,
  lddldLogs,
  lddlwalletLogs,
  isDaemonRemote,
  isDaemonStarted,
  walletReady,
}
) => (
  <Aux>
    {!isDaemonRemote && isDaemonStarted ?
      !lddldLogs ?
        <div className="log-area hidden">
          <div className="log-area-title hidden" onClick={showLddldLogs}>
            <T id="help.logs.lddld" m="lddld" />
          </div>
        </div>:
        <div className="log-area expanded">
          <div className="log-area-title expanded" onClick={hideLddldLogs}>
            <T id="help.logs.lddld" m="lddld" />
          </div>
          <div className="log-area-logs">
            <textarea rows="30" value={lddldLogs} disabled />
          </div>
        </div> :
      <div/>
    }
    {!walletReady ? null : !lddlwalletLogs ?
      <div className="log-area hidden">
        <div className="log-area-title hidden" onClick={showDcrwalletLogs}>
          <T id="help.logs.lddlwallet" m="lddlwallet" />
        </div>
      </div>:
      <div className="log-area expanded">
        <div className="log-area-title expanded" onClick={hideDcrwalletLogs}>
          <T id="help.logs.lddlwallet" m="lddlwallet" />
        </div>
        <div className="log-area-logs">
          <textarea rows="30" value={lddlwalletLogs} disabled />
        </div>
      </div>
    }
  </Aux>
);

export default Logs;
