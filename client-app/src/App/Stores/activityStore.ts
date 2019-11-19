import { observable, action } from 'mobx';
import { createContext } from 'react';
import { IActivity } from '../Models/activity';
import agent from '../Api/agent';

class ActivityStore {
  @observable activities: IActivity[] = [];
  @observable loadingInitial = false;
  @observable selectedActivity: IActivity | undefined;
  @observable editForm = false;

  @action loadActivities = async () => {
    this.loadingInitial = true;

    try {
      const activities = await agent.Activities.list();
      activities.forEach(activity => {
        activity.date = activity.date.split('.')[0];
        this.activities.push(activity);
      });
      this.loadingInitial = false;
    } catch (error) {
      console.error(error);
      this.loadingInitial =
    }
  }

  @action selectActivity = (id: string) => {
    this.selectedActivity = this.activities.find(x => x.id === id);
    this.editForm = false;
  }
}

export default createContext(new ActivityStore());