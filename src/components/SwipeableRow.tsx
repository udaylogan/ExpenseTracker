import React from 'react';
import { RectButton } from 'react-native-gesture-handler';
import { View, Text, StyleSheet } from 'react-native';
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';

interface Props {
  children: React.ReactNode;
  onDelete: () => void;
}

const SwipeableRow: React.FC<Props> = ({ children, onDelete }) => {
  const renderRight = () => (
    <RectButton style={styles.del} onPress={onDelete}>
      <Text style={styles.txt}>Delete</Text>
    </RectButton>
  );
  return <Swipeable renderRightActions={renderRight}>{children}</Swipeable>;
};

const styles = StyleSheet.create({
  del: { backgroundColor: 'red', justifyContent: 'center', flex: 1 },
  txt: { color: '#fff', padding: 20, fontWeight: '700' },
});
export default SwipeableRow;
