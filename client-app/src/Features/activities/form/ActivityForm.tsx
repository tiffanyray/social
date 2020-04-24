import React, { useContext, useEffect, useState } from "react";
import { Segment, Form, Button, Grid } from "semantic-ui-react";
import { v4 as uuid } from "uuid";
import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router";
import { Form as FinalForm, Field } from "react-final-form";
import TextInput from "../../../Core/form/TextInput";
import TextAreaInput from "../../../Core/form/TextAreaInput";
import SelectInput from "../../../Core/form/SelectInput";
import DateInput from "../../../Core/form/DateInput";
import { combineDateAndTime } from "../../../Core/util/util";
import { ActivityFormValues } from "../../../App/Models/activity";
import categoryOptions from "./categoryOptions";
import {
  combineValidators,
  isRequired,
  composeValidators,
  hasLengthGreaterThan,
} from "revalidate";
import { RootStoreContext } from "../../../App/Stores/rootStore";

interface DetailProps {
  id: string;
}

const ActivityForm: React.FC<RouteComponentProps<DetailProps>> = ({
  match,
  history,
}) => {
  const rootStore = useContext(RootStoreContext);
  const {
    createActivity,
    editActivty,
    submitting,
    loadActivity,
  } = rootStore.activityStore;

  const [activity, setActivity] = useState(new ActivityFormValues());

  const validate = combineValidators({
    title: isRequired("Title"),
    category: isRequired("Category"),
    description: composeValidators(
      isRequired("Description"),
      hasLengthGreaterThan(4)({
        message: "Description needs to be at least five characters",
      })
    )(),
    city: isRequired("City"),
    venue: isRequired("Venue"),
    date: isRequired("Date"),
    time: isRequired("Time"),
  });

  const onFinalFormSubmit = (values: any) => {
    const dateAndTime = combineDateAndTime(values.date, values.time);
    const { date, time, ...activity } = values;
    activity.date = dateAndTime;

    if (!activity.id) {
      const newActivity = {
        ...activity,
        id: uuid(),
      };
      createActivity(newActivity);
    } else {
      editActivty(activity);
    }
  };

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (match.params.id) {
      setLoading(true);
      loadActivity(match.params.id)
        .then((activity) => setActivity(new ActivityFormValues(activity)))
        .finally(() => {
          setLoading(false);
        });
    }
  }, [loadActivity, match.params.id]);

  return (
    <Grid>
      <Grid.Column width={10}>
        <Segment clearing>
          <FinalForm
            initialValues={activity}
            onSubmit={onFinalFormSubmit}
            validate={validate}
            render={({ handleSubmit, invalid, pristine }) => (
              <Form onSubmit={handleSubmit} loading={loading}>
                <Field
                  name="title"
                  value={activity.title}
                  placeholder="Title"
                  component={TextInput}
                />
                <Field
                  name="description"
                  value={activity.description}
                  placeholder="Description"
                  rows="3"
                  component={TextAreaInput}
                />
                <Field
                  name="category"
                  value={activity.category}
                  placeholder="Category"
                  component={SelectInput}
                  options={categoryOptions}
                />
                <Form.Group widths="equal">
                  <Field
                    name="date"
                    date
                    value={activity.date}
                    placeholder="Date"
                    component={DateInput}
                  />
                  <Field
                    name="time"
                    time
                    value={activity.time}
                    placeholder="Time"
                    component={DateInput}
                  />
                </Form.Group>
                <Field
                  name="city"
                  value={activity.city}
                  placeholder="City"
                  component={TextInput}
                />
                <Field
                  name="venue"
                  value={activity.venue}
                  placeholder="Venue"
                  component={TextInput}
                />
                <Button
                  disabled={loading}
                  floated="right"
                  type="button"
                  content="Cancel"
                  onClick={
                    activity.id
                      ? () => history.push(`/activities/${activity.id}`)
                      : () => history.push("/activities")
                  }
                />
                <Button
                  disabled={loading || invalid || pristine}
                  floated="right"
                  positive
                  type="submit"
                  content="Submit"
                  loading={submitting}
                />
              </Form>
            )}
          />
        </Segment>
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivityForm);
