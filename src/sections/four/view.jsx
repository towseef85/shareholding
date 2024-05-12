import { ChecklistOutlined, ModeCommentOutlined } from '@mui/icons-material';
import AppCreateScreen from 'src/components/common/AppCreateScreen';
import ListView from 'src/components/common/ListView';

export default function FourView() {
  const columns = [
    { field: 'code', headerName: 'code', flex: 1 },
    { field: 'description', headerName: 'description', flex: 1 },
    { field: 'projectName', headerName: 'project', flex: 1 },
    { field: 'completionPercent', headerName: 'Completion', flex: 1 },
  ];

  const data = [
    { id: '123', code: 1, description: 'description', projectName: 'name', completionPercent: 10 },
  ];

  const additionalActions = (params) => [
    {
      label: 'Update Status',
      disabled: false,
      icon: <ModeCommentOutlined color="success" />,
      onClick: () => console.log(params.id),
    },
    {
      label: 'Task Completion',
      disabled: false,
      icon: <ChecklistOutlined color="success" />,
      onClick: () => console.log(params.id),
    },
  ];
  return (
    <ListView
      header="Tasks"
      title="Tasks"
      handleGetDetails={() => console.log('testing')}
      columns={columns}
      data={data}
      loaded={false}
      additionalActions={additionalActions}
      disableCondition={false}
      modelname="tasks"
    />
  );
}
