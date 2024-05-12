import {
  Container,
  Box,
  Stack,
  Typography,
  Button,
  SvgIcon,
  Card,
  CardHeader,
  CardContent,
  IconButton,
  Tooltip,
  TextField,
  Menu,
  MenuItem,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useState, useMemo } from 'react';
import PlusIcon from '@untitled-ui/icons-react/build/esm/Plus';

import { DataGrid } from '@mui/x-data-grid';
import Edit01 from '@untitled-ui/icons-react/build/cjs/Edit01';
import SearchIcon from '@untitled-ui/icons-react/build/cjs/SearchMd';
import Eye from '@untitled-ui/icons-react/build/cjs/Eye';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import LoadingScreen from './LoadingScreen';
import { useSettingsContext } from 'src/components/settings';

export default function ListView({
  header,
  handleGetDetails,
  navigateToDetails = false,
  title,
  columns,
  data,
  loaded,
  additionalActions = null,
  disableCondition = null,
  modelname = null,
  page,
  pageSize,
  rowCount,
  onPageChange,
  ...rest
}) {
  const location = useLocation();
  const settings = useSettingsContext();
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuRowId, setMenuRowId] = useState(null);
  //   const permission =
  //     user?.permissions && user?.permissions.find((x) => x.featureName === modelname);

  const handleMenuOpen = (event, rowId) => {
    setAnchorEl(event.currentTarget);
    setMenuRowId(rowId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setMenuRowId(null);
  };

  const newColumns = [
    {
      field: 'action',
      headerName: 'Actions',
      flex: 1.5,
      renderCell: (params) => {
        const handleEdit = () => {
          navigate(`${location}/create/${params.id}`);
        };

        const handleClick = () => {
          if (navigateToDetails) {
            navigate(`${location}/details/${params.id}`);
            return;
          }
          handleGetDetails(params.id);
        };

        return (
          <>
            <Tooltip title="Edit" placement="top">
              <IconButton
                disabled={disableCondition ? disableCondition(params) : false}
                color="primary"
                onClick={handleEdit}
              >
                <Edit01 />
              </IconButton>
            </Tooltip>

            <Tooltip title="Details" placement="top">
              <IconButton color="secondary" onClick={handleClick}>
                <Eye />
              </IconButton>
            </Tooltip>

            {additionalActions && (
              <>
                <IconButton onClick={(event) => handleMenuOpen(event, params.id)}>
                  <MoreVertIcon />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl) && menuRowId === params.id}
                  onClose={handleMenuClose}
                >
                  {additionalActions(params).map((action, index) => (
                    <MenuItem
                      key={index}
                      onClick={() => {
                        action.onClick(params);
                        handleMenuClose();
                      }}
                      disabled={action.disabled}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {action.icon}
                        <Typography variant="body2" sx={{ ml: 1 }}>
                          {action.label}
                        </Typography>
                      </Box>
                    </MenuItem>
                  ))}
                </Menu>
              </>
            )}
          </>
        );
      },
    },
    ...columns,
  ];
  const handlePageChange = (newPage) => {
    onPageChange(newPage);
  };

  const filteredData = useMemo(() => {
    if (!searchText) return data;
    return data.filter((row) =>
      columns.some(
        (column) =>
          row[column.field] !== undefined &&
          row[column.field] !== null &&
          row[column.field].toString().toLowerCase().includes(searchText.toLowerCase())
      )
    );
  }, [data, searchText, newColumns]);

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 2,
      }}
    >
      <Container maxWidth={settings.themeStretch ? false : 'xl'}>
        <Stack spacing={2}>
          <Stack direction="row" justifyContent="space-between" spacing={1}>
            <Typography variant="h5">{header}</Typography>

            <Button
              variant="contained"
              component={Link}
              href={`${location}/create`}
              startIcon={
                <SvgIcon>
                  <PlusIcon />
                </SvgIcon>
              }
            >
              {`Add ${header}`}
            </Button>
          </Stack>
          <Card>
            <CardHeader
              title={`List  ${title}`}
              action={
                <TextField
                  variant="outlined"
                  size="small"
                  placeholder="Search..."
                  onChange={handleSearchChange}
                  InputProps={{
                    endAdornment: (
                      <IconButton>
                        <SearchIcon />
                      </IconButton>
                    ),
                  }}
                />
              }
            />
            <CardContent>
              {loaded ? (
                <LoadingScreen />
              ) : (
                <div style={{ width: '100%' }}>
                  <DataGrid
                    pageSize={pageSize}
                    rowsPerPageOptions={[10, 25, 50, 100]}
                    rowCount={rowCount}
                    pagination
                    paginationMode="server"
                    onPageChange={(newPage) => handlePageChange(newPage)}
                    page={page}
                    disableRowSelectionOnClick={true}
                    density="comfortable"
                    autoHeight
                    rows={filteredData}
                    columns={newColumns}
                    {...rest}
                  />
                </div>
              )}
            </CardContent>
          </Card>
        </Stack>
      </Container>
    </Box>
  );
}
