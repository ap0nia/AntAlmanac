import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import React, { useEffect,useState } from 'react';

const normal_days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const abbreviated_days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];

interface DaySelectorProps {
    days?: boolean[];
    onSelectDay: (days: boolean[]) => void;
}

const DaySelector: React.FC<DaySelectorProps> = ({
    days = [false, false, false, false, false, false, false],
    onSelectDay,
}) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [selectedDays, setSelectedDays] = useState(days);

    useEffect(() => {
        onSelectDay(selectedDays);
    }, [selectedDays]);

    const handleChange = (dayIndex: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const checked = event.target.checked;
        const newDays = [...selectedDays];
        newDays[dayIndex] = checked;
        setSelectedDays(newDays);
    };

    if (isMobile) {
        return (
            <FormGroup row>
                {abbreviated_days.map((day, index) => (
                    <FormControlLabel
                        key={index}
                        control={
                            <Checkbox
                                checked={selectedDays[index]}
                                onChange={handleChange(index)}
                                value={index}
                                color="primary"
                            />
                        }
                        label={day}
                    />
                ))}
            </FormGroup>
        );
    } else {
        return (
            <FormGroup row>
                {normal_days.map((day, index) => (
                    <FormControlLabel
                        key={index}
                        control={
                            <Checkbox
                                checked={selectedDays[index]}
                                onChange={handleChange(index)}
                                value={index}
                                color="primary"
                            />
                        }
                        label={day}
                    />
                ))}
            </FormGroup>
        );
    }
};

export default DaySelector;
