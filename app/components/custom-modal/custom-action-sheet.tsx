
import React from 'react';
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';

const PRIMARY_COLOR = 'rgb(0,98,255)';
const WHITE = '#ffffff';
const BORDER_COLOR = '#DBDBDB';

type Props = {
  navigation: any;
  onCancel: any;
  actionItems: any;
};

const ActionSheet: React.FC<Props> = ({
  navigation,
  onCancel,
  actionItems
}) => {
  const actionSheetItems = [
    ...actionItems,
    {
      id: "#cancel",
      label: "Cancel",
      onPress: onCancel,
    },
  ];
  return (
    <View style={styles.modalContent}>
      <View
        style={[
          styles.actionSheetView,
          { borderTopLeftRadius: 12, borderTopRightRadius: 12 },
        ]}
      >
        <Text style={{ color: "#8F8F8F", fontWeight:'bold' }}>
          Would you like a copy of this recommendation?
        </Text>
      </View>
      {actionSheetItems.map((actionItem, index) => {
        return (
          <TouchableHighlight
            style={[
              styles.actionSheetView,
              index === actionSheetItems.length - 2 && {
                borderBottomLeftRadius: 12,
                borderBottomRightRadius: 12,
              },
              index === actionSheetItems.length - 1 && {
                borderBottomWidth: 0,
                backgroundColor: WHITE,
                marginTop: 8,
                borderTopLeftRadius: 12,
                borderTopRightRadius: 12,
                borderBottomLeftRadius: 12,
                borderBottomRightRadius: 12,
              },
            ]}
            underlayColor={"#f7f7f7"}
            key={index}
            onPress={actionItem.onPress}
          >
            <Text
              allowFontScaling={false}
              style={[
                styles.actionSheetText,
                index === actionSheetItems.length - 1 && {
                  color: "#007AFF",
                  fontWeight: "bold",
                },
              ]}
            >
              {actionItem.label}
            </Text>
          </TouchableHighlight>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    marginLeft: 8,
    marginRight: 8,
    marginBottom: 20,
  },
  actionSheetText: {
    fontSize: 18,
    color: PRIMARY_COLOR
  },
  actionSheetView: {
    backgroundColor: WHITE,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 16,
    paddingBottom: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: BORDER_COLOR
  }
});


export default ActionSheet;