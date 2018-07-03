import { combineReducers } from 'redux';
import { DurationReducer } from './DurationReducer';
import { ActionReducer } from './ActionReducer';
import { EventReducer } from './EventReducer';
import { ClientReducer } from './ClientReducer';
import { ChronoReducer } from './ChronoReducer';
import { ProjectReducer } from './ProjectReducer';
import { KanbanReducer } from './KanbanReducer';
import { TaskReducer } from './TaskReducer';
import { TabReducer } from './TabReducer';
export default combineReducers({
  selectedDuration: DurationReducer,
  selectedAction: ActionReducer,
  eventsData: EventReducer,
  clients: ClientReducer,
  chrono: ChronoReducer,
  projects: ProjectReducer,
  kanbans: KanbanReducer,
  tasks: TaskReducer,
  tabs: TabReducer
});
