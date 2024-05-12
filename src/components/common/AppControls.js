import { useField, useFormikContext } from 'formik';
import {
  TextField,
  Grid,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  MenuItem,
  ListSubheader,
  Select,
  InputLabel,
  FormHelperText,
  Switch,
  Checkbox,
  OutlinedInput,
  Box,
  Chip,
  ListItemText,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { parse, format } from 'date-fns';
import { getMessage } from 'src/utils/dictionaryUtils';
import { useEffect } from 'react';
import jwtApi from 'src/api/core/httpService';
import toast from 'react-hot-toast';

const AppSwitchControl = ({ name, my = 2, label, ...rest }) => {
  const [field, meta] = useField(name);
  const { setFieldValue, values } = useFormikContext(name);
  return (
    <Grid
      sx={{
        my: my,
      }}
      item
    >
      <FormControl>
        <FormLabel>{label}</FormLabel>
        <Switch
          checked={values[name]}
          onChange={(value) => setFieldValue(field.name, value)}
          inputProps={{ 'aria-label': 'controlled' }}
          {...field}
          {...meta}
          {...rest}
        />
      </FormControl>
    </Grid>
  );
};

const AppCheckboxControl = ({ name, my = 1, label, ...rest }) => {
  const [field] = useField(name);
  const { values } = useFormikContext(name);
  return (
    <Grid item>
      <FormControlLabel
        control={<Checkbox checked={values[name]} {...field} {...rest} />}
        label={label}
      />
    </Grid>
  );
};
const AppCodetextField = ({ name, id, my = 2, tableName, ...rest }) => {
  const [field, meta] = useField(name);
  const { setFieldValue } = useFormikContext(name);
  useEffect(() => {
    if (!id) {
      jwtApi
        .get(`General/GetCode?tableName=${tableName}`)
        .then((res) => {
          if (res.status === 200) {
            setFieldValue(field.name, res.data.data);
          }
        })
        .catch((error) => {
          toast.error('unable to find the code', error.message);
        });
    }
  }, []);
  return (
    <Grid
      sx={{
        my: my,
      }}
      item
    >
      <TextField
        fullWidth
        helperText={meta.touched && meta.error}
        label="Code"
        disabled
        name={name}
        {...field}
        {...rest}
      />
    </Grid>
  );
};
const AppTextField = ({ name, label, my = 2, ...rest }) => {
  const [field, meta] = useField(name);
  return (
    <Grid
      sx={{
        my: my,
      }}
      item
    >
      <TextField
        id="outlined-basic"
        error={!!(meta.touched && meta.error)}
        fullWidth
        helperText={meta.touched && meta.error}
        label={label}
        name={name}
        {...field}
        {...rest}
      />
    </Grid>
  );
};

const AppDatePicker = ({ name, label, variant = 'outlined', py = 2, ...rest }) => {
  const [field, meta] = useField(name);
  const { setFieldValue, values } = useFormikContext();
  let date = parse(values[name], 'dd/MM/yyyy', new Date());
  return (
    <Grid
      sx={{
        my: py,
      }}
      item
    >
      <DatePicker
        label={label}
        name={name}
        format="dd/MM/yyyy"
        value={date}
        slotProps={{
          textField: {
            variant: variant,
            error: !!(meta.touched && meta.error),
            helperText: meta.touched && meta.error,
            fullWidth: true,
          },
        }}
        onChange={(value) => setFieldValue(field.name, format(value, 'dd/MM/yyyy') || null)}
        {...rest}
      />
    </Grid>
  );
};

const AppRadioGroup = ({ name, label, defaultValue, options }) => {
  const [field, meta] = useField(name);
  const { handleChange } = useFormikContext();
  return (
    <FormControl>
      {options && (
        <>
          <FormLabel>{label}</FormLabel>
          <RadioGroup
            onChange={handleChange}
            defaultValue={defaultValue}
            {...field}
            {...meta}
            row
            name={name}
          >
            {options.map((x) => (
              <FormControlLabel value={x.value} control={<Radio />} label={x.label} />
            ))}
          </RadioGroup>
        </>
      )}
    </FormControl>
  );
};
// const AppSelect = ({ label, options=[], onChangeCallback, ...props }) => {
//   const [field, meta] = useField(props);

//   const handleChange = (event) => {
//     field.onChange(event);
//      if(onChangeCallback){
//        onChangeCallback(event.target.value); // Custom onChange handler for API
//      }
//   };

//   const configSelect = {
//     ...field,
//     ...props,
//     onChange: handleChange,
//   };

//   if (meta && meta.touched && meta.error) {
//     configSelect.error = true;
//   }

//   return (
//     <FormControl fullWidth error={meta.touched && Boolean(meta.error)}>
//       <InputLabel>{label}</InputLabel>
//       <Select {...configSelect}>
//         {options.map((option) => (
//           <MenuItem key={option.value} value={option.value}>
//             {option.label}
//           </MenuItem>
//         ))}
//       </Select>
//       {meta.touched && meta.error ? (
//         <FormHelperText>{meta.error}</FormHelperText>
//       ) : null}
//     </FormControl>
//   );
// };
const AppSelectField = ({
  label,
  py = 2,
  options = [],
  fullWidth,
  disabled = false,
  onChangeCallback,
  ...props
}) => {
  const [field, meta] = useField(props);

  const handleChange = (event) => {
    field.onChange(event);
    if (onChangeCallback) {
      onChangeCallback(event.target.value);
    }
  };

  const configSelect = {
    ...field,
    ...props,
    label: label,
    fullWidth: true,
    onChange: handleChange,
  };

  if (meta && meta.touched && meta.error) {
    configSelect.error = true;
  }

  return (
    <Grid
      sx={{
        my: py,
      }}
      item
    >
      <FormControl variant="outlined" fullWidth error={meta.touched && Boolean(meta.error)}>
        <InputLabel>{label}</InputLabel>
        <Select {...configSelect}>
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.text}
            </MenuItem>
          ))}
        </Select>
        {meta.touched && meta.error ? <FormHelperText>{meta.error}</FormHelperText> : null}
      </FormControl>
    </Grid>
  );
};

const AppChipSelectControl = ({ data = [], py = 1, name, label, onChangeCallback, ...props }) => {
  const [field, meta] = useField(name);
  const { setFieldValue } = useFormikContext();
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const handleChange = (event) => {
    debugger;
    field.onChange(event);
    console.log('event', event);
    const {
      target: { value },
    } = event;
    setFieldValue(name, typeof value === 'string' ? value.split(',') : value);
    if (onChangeCallback) {
      onChangeCallback(value);
    }
  };

  const configSelect = {
    ...field,
    ...props,
    label: label,
    fullWidth: true,
    onChange: handleChange,
    input: <OutlinedInput label={label} />,
    renderValue: (selected) =>
      selected
        .map((teamId) => {
          const team = data.find((team) => team.value === teamId);
          return team ? team.text : 'Unknown'; // Replace 'Unknown' with any placeholder you prefer
        })
        .join(', '),
    MenuProps: MenuProps,
  };

  return (
    <Grid sx={{ my: py }} item>
      <FormControl variant="outlined" sx={{ width: '100%' }} error={meta.touched && !!meta.error}>
        <InputLabel id="team-mutiple-checkbox-label">{label}</InputLabel>
        <Select
          labelId="team-mutiple-checkbox-label"
          id="team-mutiple-checkbox"
          multiple
          {...configSelect}
        >
          {data.map((team) => (
            <MenuItem key={team.value} value={team.value}>
              <Checkbox checked={field.value.indexOf(team.value) > -1} />
              <ListItemText primary={team.text} />
            </MenuItem>
          ))}
        </Select>
        {meta.touched && meta.error ? <FormHelperText>{meta.error}</FormHelperText> : null}
      </FormControl>
    </Grid>
  );
};

const AppMultiSelectControl = ({
  name,
  label,
  py = 2,
  options,
  fullWidth,
  disabled = false,
  ...rest
}) => {
  const [field, meta] = useField(name);
  const { handleChange } = useFormikContext(name);
  const renderSelectGroup = (data) => {
    const items = data?.children.map((p) => {
      return (
        <MenuItem key={p.id} value={p.id}>
          <span> {p.name}</span>
        </MenuItem>
      );
    });
    return [<ListSubheader>{data.headers}</ListSubheader>, items];
  };
  return (
    <Grid
      sx={{
        my: py,
      }}
      item
    >
      <FormControl fullWidth>
        <InputLabel htmlFor="grouped-select">{label}</InputLabel>
        <Select
          name={name}
          label={label}
          fullWidth
          error={!!(meta.touched && meta.error)}
          helperText={meta.touched && meta.error}
          {...field}
          onChange={handleChange}
        >
          {options?.map((p) => renderSelectGroup(p))}
        </Select>
      </FormControl>
    </Grid>
  );
};

const AppMultiSelectWithCheckbox = ({
  data = [],
  py = 1,
  name,
  label,
  onChangeCallback,
  ...props
}) => {
  const [field, meta] = useField(name);
  const { setFieldValue } = useFormikContext();
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const handleChange = (event) => {
    const value = event.target.value;
    let newValueArray = Array.isArray(field.value) ? [...field.value] : [];
    if (newValueArray.includes(value)) {
      newValueArray = newValueArray.filter((item) => item !== value);
    } else {
      newValueArray.push(value);
    }
    setFieldValue(name, newValueArray);
    if (onChangeCallback) {
      onChangeCallback(newValueArray);
    }
  };

  const configSelect = {
    ...field,
    ...props,
    label: label,
    fullWidth: true,
    input: (
      <OutlinedInput
        label={label}
        style={{ height: 'auto', minHeight: '56', overflow: 'hidden' }}
      />
    ),
    renderValue: (selected) =>
      selected
        .map((userId) => {
          for (let team of data) {
            const user = team.children.find((u) => u.value === userId);
            if (user) {
              return user.text;
            }
          }
          return 'Unknown';
        })
        .join(', '),
    MenuProps: MenuProps,
  };

  return (
    <Grid sx={{ my: py }} item>
      <FormControl variant="outlined" sx={{ width: '100%' }} error={meta.touched && !!meta.error}>
        <InputLabel id="team-mutiple-checkbox-label">{label}</InputLabel>
        <Select
          labelId="team-mutiple-checkbox-label"
          id="team-mutiple-checkbox"
          multiple
          {...configSelect}
        >
          {data.map((x) => (
            <li key={x.headers}>
              <strong>{x.headers}</strong>
              {x.children.map((team) => (
                <MenuItem key={team.value} value={team.value}>
                  <Checkbox
                    checked={field.value.includes(team.value)}
                    onChange={handleChange}
                    value={team.value}
                  />
                  <ListItemText
                    style={{ maxHeight: 120, overflow: 'auto', padding: 0 }}
                    primary={team.text}
                  />
                </MenuItem>
              ))}
            </li>
          ))}
        </Select>
        {meta.touched && meta.error ? <FormHelperText>{meta.error}</FormHelperText> : null}
      </FormControl>
    </Grid>
  );
};

const AppControls = {
  AppTextField,
  AppSelectField,
  AppDatePicker,
  AppRadioGroup,
  AppMultiSelectControl,
  AppCodetextField,
  AppSwitchControl,
  AppCheckboxControl,
  AppChipSelectControl,
  AppMultiSelectWithCheckbox,
};

export default AppControls;
