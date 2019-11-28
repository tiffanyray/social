import { observable, action, computed, configure, runInAction } from 'mobx';
import { createContext, SyntheticEvent } from 'react';
import { IActivity } from '../Models/activity';
import agent from '../Api/agent';

configure({ enforceActions: 'always' });

class ActivityStore {
  @observable activityRegistry = new Map();

  @observable activities: IActivity[] = [];

  @observable loadingInitial = false;

  @observable activity: IActivity | null = null;

  @observable editForm = false;

  @observable submitting = false;

  @observable target = '';

  @computed get activitiesByDate() {
    return Array.from(this.activityRegistry.values())
      .sort((a, b) => Date.parse(a.date) - Date.parse(b.date));
  }

  @action loadActivities = async () => {
    this.loadingInitial = true;

    try {
      const activities = await agent.Activities.list();
      runInAction('loading activities', () => {
        activities.forEach((activity) => {
          activity.date = activity.date.split('.')[0];
          this.activityRegistry.set(activity.id, activity);
        });
        this.loadingInitial = false;
      });
    } catch (error) {
      console.error(error);
      runInAction('load activities error', () => {
        this.loadingInitial = false;
      });
    }
  };

  @action loadActivity = async (id: string) => {
    let activity = this.getActivity(id);
    if (activity) {
      this.activity = activity;
    } else {
      this.loadingInitial = true;
      try {
        activity = await agent.Activities.details(id);
        runInAction('gtting activity', () => {
          this.activity = activity;
          this.loadingInitial = false;
        })
      } catch (error) {
        console.error(error);
        runInAction('get activity error', () => {
          this.loadingInitial = false;
        })
      }
    }
  };

  getActivity = (id: string) => {
    return this.activityRegistry.get(id);
  };

  @action createActivity = async (activity: IActivity) => {
    this.submitting = true;
    try {
      await agent.Activities.create(activity);
      runInAction('create load', () => {
        this.activityRegistry.set(activity.id, activity);
        this.editForm = false;
        this.submitting = false;
      });
    } catch (error) {
      console.error(error);
      runInAction('create load error', () => {
        this.submitting = false;
      })
    }
  }

  @action editActivty = async (activity: IActivity) => {
    this.submitting = true;
    try {
      await agent.Activities.update(activity);
      runInAction('edit load', () => {
        this.activityRegistry.set(activity.id, activity);
        this.submitting = false;
        this.editForm = false;
        this.activity = activity;
      })
    } catch (error) {
      console.error(error);
      runInAction('edit load error', () => {
        this.submitting = false;
      })
    }
  };

  @action deleteActivity = async (id: string, event: SyntheticEvent<HTMLButtonElement>) => {
    this.submitting = true;
    this.target = event.currentTarget.name;
    try {
      await agent.Activities.delete(id);
      runInAction('delete loading', () => {
        this.activityRegistry.delete(id);
        this.submitting = false;
        this.target = '';
      })
    } catch (error) {
      console.error(error);
      runInAction('delete loading error', () => {
        this.submitting = false;
        this.target = '';
      })
    }
  };

  @action clearActivity = () => {
    this.activity = null;
  };

  @action selectActivity = (id: string) => {
    this.activity = this.activityRegistry.get(id);
    this.editForm = false;
  };

  @action openCreateForm = () => {
    this.editForm = true;
    this.activity = null;
  }

  @action openEditForm = (id: string) => {
    this.editForm = true;
    this.activity = this.activityRegistry.get(id);
  };

  @action closeForm = () => {
    this.editForm = false;
    this.activity = null;
  };
}

export default createContext(new ActivityStore());
