import { combineReducers } from 'redux';
import { DurationReducer } from './DurationReducer';
import { ActionReducer } from './ActionReducer';
import { EventReducer } from './EventReducer';
import { ClientReducer } from './ClientReducer';
import { ChronoReducer } from './ChronoReducer';
import { ProjectReducer } from './ProjectReducer';
import { KanbanReducer } from './KanbanReducer';
import { CardReducer } from './CardReducer';
import { TabReducer } from './TabReducer';
import { UserReducer } from './UserReducer';
import { AuthenticationReducer } from './AuthenticationReducer';
import { ErrorReducer } from './ErrorReducer';
import { LoaderReducer } from './LoaderReducer';
import { ActionKindsReducer } from './ActionKindsReducer';
import { BackgroundImageReducer } from './BackgroundImageReducer';
import { ResourceReducer } from './ResourceReducer';

export default combineReducers({
  selectedDuration: DurationReducer,
  selectedAction: ActionReducer,
  eventsData: EventReducer,
  clients: ClientReducer,
  chrono: ChronoReducer,
  projects: ProjectReducer,
  kanbans: KanbanReducer,
  cards: CardReducer,
  user: UserReducer,
  tabs: TabReducer,
  authentication: AuthenticationReducer,
  actionKinds: ActionKindsReducer,
  error: ErrorReducer,
  loading: LoaderReducer,
  backgroundImage: BackgroundImageReducer,
  resources: ResourceReducer
});
