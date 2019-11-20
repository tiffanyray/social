import { observable, action, computed } from 'mobx';
import { createContext } from 'react';
import { IActivity } from '../Models/activity';
import agent from '../Api/agent';

class ActivityStore {
  @observable activityRegistry = new Map();

  @observable activities: IActivity[] = [];

  @observable loadingInitial = false;

  @observable selectedActivity: IActivity | undefined;

  @observable editForm = false;

  @observable submitting = false;

  @computed get activitiesByDate() {
    return Array.from(this.activityRegistry.values())
      .sort((a, b) => Date.parse(a.date) - Date.parse(b.date));
  }

  @action loadActivities = async () => {
    this.loadingInitial = true;

    try {
      const activities = await agent.Activities.list();
      activities.forEach((activity) => {
        activity.date = activity.date.split('.')[0];
        this.activityRegistry.set(activity.id, activity);
      });
      this.loadingInitial = false;
    } catch (error) {
      console.error(error);
      this.loadingInitial = false;
    }
  };

  @action selectActivity = (id: string) => {
    this.selectedActivity = this.activityRegistry.get(id);
    this.editForm = false;
  };

  @action createActivity = async (activity: IActivity) => {
    this.submitting = true;
    try {
      await agent.Activities.create(activity);
      this.activityRegistry.set(activity.id, activity);
      this.editForm = false;
      this.submitting = false;
    } catch (error) {
      console.error(error);
      this.submitting = false;
    }
  }

  @action editActiivty = async (activity: IActivity) => {
    this.submitting = true;
    try {
      await agent.Activities.update(activity);
      this.activityRegistry.set(activity.id, activity);
      this.submitting = false;
      this.editForm = false;
      this.selectedActivity = activity;
    } catch (error) {
      console.error(error);
      this.submitting = false;
    }
  };

  @action openCreateForm = () => {
    this.editForm = true;
    this.selectedActivity = undefined;
  }

  @action openEditForm = (id: string) => {
    this.editForm = true;
    this.selectedActivity = this.activityRegistry.get(id);
  };

  @action closeForm = () => {
    this.editForm = false;
    this.selectedActivity = undefined;
  };
}

export default createContext(new ActivityStore());
