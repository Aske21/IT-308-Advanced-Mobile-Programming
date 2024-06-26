/* eslint-disable prettier/prettier */
/* eslint-disable radix */
import React, {useState} from 'react';
import {View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Input from '../../components/input';
import Toggle from '../../components/toggle';
import {selectQuoteToggle} from '../../redux/slices/quote/quoteSelectors';
import {toggleQuoteFetching} from '../../redux/slices/quote/quoteSlice';
import {styles} from './style';
import {
  selectBreakTime,
  selectWorkTime,
} from '../../redux/slices/timer/timerSelectors';
import {setWorkTime, setBreakTime} from '../../redux/slices/timer/timerSlice';

const Settings: React.FC = () => {
  const dispatch = useDispatch();
  const quotePreference = useSelector(selectQuoteToggle);
  const workTime = useSelector(selectWorkTime);
  const breakTime = useSelector(selectBreakTime);
  const [workDuration, setWorkDuration] = useState(`${workTime / 60}`);
  const [breakDuration, setBreakDuration] = useState(`${breakTime / 60}`);

  const toggleQuote = () => {
    dispatch(toggleQuoteFetching());
  };

  const handleWorkDurationChange = (text: string) => {
    setWorkDuration(text);
  };

  const handleWorkDurationBlur = (text: string) => {
    const numericText = text.replace(/[^0-9]/g, '');
    if (numericText !== '') {
      dispatch(setWorkTime(parseInt(numericText) * 60));
    } else {
      setWorkDuration(`${workTime / 60}`);
    }
  };

  const handleBreakDurationChange = (text: string) => {
    setBreakDuration(text);
  };

  const handleBreakDurationBlur = (text: string) => {
    const numericText = text.replace(/[^0-9]/g, '');
    if (numericText !== '') {
      dispatch(setBreakTime(parseInt(numericText) * 60));
    } else {
      setBreakDuration(`${breakTime / 60}`);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.middleContent}>
        <View style={styles.settingItem}>
          <Input
            label={'Work duration (minutes)'}
            value={workDuration}
            onChangeText={handleWorkDurationChange}
            onBlur={() => handleWorkDurationBlur(workDuration)}
            keyboardType="number-pad"
          />
        </View>
        <View style={styles.settingItem}>
          <Input
            label={'Break duration (minutes)'}
            value={breakDuration}
            onChangeText={handleBreakDurationChange}
            onBlur={() => handleBreakDurationBlur(breakDuration)}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.settingItem}>
          <Toggle onValueChange={toggleQuote} value={quotePreference} />
        </View>
      </View>
    </View>
  );
};

export default Settings;
