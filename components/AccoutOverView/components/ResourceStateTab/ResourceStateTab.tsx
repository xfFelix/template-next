import cls from 'classnames';
import Style from './ResourceStateTab.module.scss';
import { ResourceState, ResourceStateLabel } from '../../../../constants/enum/ResourceState';

interface ResourceStateTabProps {
  state: ResourceState;
}

function ResourceStateTab(props: ResourceStateTabProps) {
  const { state } = props;
  const content = ResourceStateLabel[state];

  return (
    <div
      className={cls(Style['resource-state-tab'], {
        [Style.enable]: state === ResourceState.ACTIVE,
        [Style.expired]: state === ResourceState.EXPIRED,
        [Style.frozen]: state === ResourceState.FROZEN,
        [Style.pending]: state === ResourceState.PENDING,
        [Style.canceled]: state === ResourceState.CANCELED,
      })}
    >
      {content}
    </div>
  );
}

export default ResourceStateTab;
