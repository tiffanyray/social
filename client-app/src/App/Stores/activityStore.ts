import { observable, action, computed, configure, runInAction } from "mobx";
import { createContext, SyntheticEvent } from "react";
import { IActivity } from "../Models/activity";
import agent from "../Api/agent";
import { history } from "../../index";
import { toast } from "react-toastify";
import { RootStore } from './rootStore';

configure({ enforceActions: "always" });

export default class ActivityStore {
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.groupActivitiesByData = this.groupActivitiesByData.bind(this);
  }

  @observable activityRegistry = new Map();

  @observable loadingInitial = false;

  @observable activity: IActivity | null = null;

  @observable submitting = false;

  @observable target = "";

  @computed get activitiesByDate() {
    return this.groupActivitiesByData(
      Array.from(this.activityRegistry.values())
    );
  }

  groupActivitiesByData(activities: IActivity[]) {
    const sortedActivities = activities.sort(
      (a, b) => a.date.getTime() - b.date.getTime()
    );
    return Object.entries(
      sortedActivities.reduce((acc, curr) => {
        const date = curr.date.toISOString().split("T")[0];
        acc[date] = acc[date] ? [...acc[date], curr] : [curr];
        return acc;
      }, {} as { [key: string]: IActivity[] })
    );
  }

  @action loadActivities = async () => {
    this.loadingInitial = true;

    try {
      const activities = await agent.Activities.list();
      runInAction("loading activities", () => {
        activities.forEach((activity) => {
          activity.date = new Date(activity.date);
          this.activityRegistry.set(activity.id, activity);
        });
        this.loadingInitial = false;
      });
    } catch (error) {
      console.error(error);
      runInAction("load activities error", () => {
        this.loadingInitial = false;
      });
    }
  };

  @action loadActivity = async (id: string) => {
    let activity = this.getActivity(id);
    if (activity) {
      this.activity = activity;
      return activity;
    } else {
      this.loadingInitial = true;
      try {
        activity = await agent.Activities.details(id);
        runInAction("getting activity", () => {
          activity.date = new Date(activity.date);
          this.activity = activity;
          this.activityRegistry.set(activity.id, activity);
          this.loadingInitial = false;
        });
        return activity;
      } catch (error) {
        console.error(error);
        runInAction("get activity error", () => {
          this.loadingInitial = false;
        });
      }
    }
  };

  getActivity = (id: string) => this.activityRegistry.get(id);

  @action createActivity = async (activity: IActivity) => {
    this.submitting = true;
    try {
      await agent.Activities.create(activity);
      runInAction("create load", () => {
        this.activityRegistry.set(activity.id, activity);
        this.submitting = false;
      });

      history.push(`/activities/${activity.id}`);
    } catch (error) {
      console.error(error);
      toast.error('Problem submitting data.')
      runInAction("create load error", () => {
        this.submitting = false;
      });
    }
  };

  @action editActivty = async (activity: IActivity) => {
    this.submitting = true;
    try {
      await agent.Activities.update(activity);
      runInAction("edit load", () => {
        this.activityRegistry.set(activity.id, activity);
        this.submitting = false;
        this.activity = activity;
      });

      history.push(`/activities/${activity.id}`);
    } catch (error) {
      console.error(error);
      toast.error('Problem submitting data.')
      runInAction("edit load error", () => {
        this.submitting = false;
      });
    }
  };

  @action deleteActivity = async (
    id: string,
    event: SyntheticEvent<HTMLButtonElement>
  ) => {
    this.submitting = true;
    this.target = event.currentTarget.name;
    try {
      await agent.Activities.delete(id);
      runInAction("delete loading", () => {
        this.activityRegistry.delete(id);
        this.submitting = false;
        this.target = "";
      });
    } catch (error) {
      console.error(error);
      runInAction("delete loading error", () => {
        this.submitting = false;
        this.target = "";
      });
    }
  };

  @action clearActivity = () => {
    this.activity = null;
  };
}
