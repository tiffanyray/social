import React, { useState } from 'react';
import { Segment, Form, Button } from 'semantic-ui-react';
import { IActivity } from '../../../App/Models/activity';
import { string } from 'prop-types';

interface IProps {
  activity: IActivity | null;
  setEdit: (edit: boolean) => void;
}

export const ActivityForm: React.FC<IProps> = ({ setEdit, activity: initialActivity }) => {
  let [activity, setActivity] = useState<IActivity>(initialActivity || {
    id: '',
    title: '',
    description: '',
    category: '',
    date: '',
    city: '',
    venue: ''
  });

  const onChange = (type: string) => (event: any) => {
    setActivity({ ...activity, [type]: event.target.value })
  };

  console.log(activity);

  return (
    <Segment clearing>
      <Form>
        <Form.Input 
          value={activity.title}
          placeholder="Title"
          onChange={onChange('title')}
        />
        <Form.TextArea 
          value={activity.description}
          placeholder="Description" 
          rows={2} 
        />
        <Form.Input
          value={activity.category}
          placeholder="Category"
        />
        <Form.Input
          value={activity.date}
          type="date" 
          placeholder="Date" 
        />
        <Form.Input
          value={activity.city}
          placeholder="City" 
        />
        <Form.Input 
          value={activity.venue}
          placeholder="Venue" 
        />
        <Button 
          floated="right" 
          type="button" 
          content="Cancel" 
          onClick={() => setEdit(false)}
        />
        <Button 
          floated="right" 
          positive 
          type="submit" 
          content="Submit" 
        />
      </Form>
    </Segment>
  )
};