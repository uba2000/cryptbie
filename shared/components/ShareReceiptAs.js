import { useEffect, useCallback, useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { List } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { theme } from '../../constants';
import { selectShareReceipt } from '../../slices/globalSlice';
import { Row } from '../../utilities/components/common';
import ShareDrawer from './ShareDrawer';

function ShareReceiptAs() {
  const ref = useRef(null);

  const { isOpen } = useSelector(selectShareReceipt)

  const onPress = useCallback(() => {
    const isActive = ref?.current?.isActive();
    if (!isOpen) {
      ref?.current?.scrollTo(0);
    } else {
      ref?.current?.scrollTo('max');
      if (isActive) {
        ref?.current?.scrollTo(0);
      } else {
        ref?.current?.scrollTo('max');
      }
    }
  }, []);

  useEffect(() => { 
    onPress();
    console.log('isOpen', isOpen);
  }, [isOpen]);

  return (
    <ShareDrawer ref={ref}>
      <View style={[{ flex: 1 }, styles.drawerContainer]}>
        <Row style={styles.headerSection}>
          <Text style={styles.headerTitle}>Share as</Text>
          <Text style={styles.headerClose}>X</Text>
        </Row>
        <Row>
          <View style={{ flex: 1 }}>
            <List.Item
              style={[styles.shareItem]}
              // onPress={handlePress}
              left={() => (
                <List.Icon
                  style={styles.shareItemImg}
                  icon={require("../../assets/images/btc.png")}
                />
              )}
              title={
                <>
                  <Text style={styles.detailValue}>
                    Image
                  </Text>
                </>
              }
            />
            <List.Item
              style={[styles.shareItem]}
              // onPress={handlePress}
              left={() => (
                <List.Icon
                  style={styles.glanceLogo}
                  icon={require("../../assets/images/btc.png")}
                />
              )}
              title={
                <>
                  <Text style={styles.detailValue}>
                    PDF
                  </Text>
                </>
              }
            />
            {/* <Row style={[styles.shareItem]}>
              <Text style={[styles.detailTitle, styles.shareItemImg]}>Payment Name:</Text>
              <Text style={styles.detailValue}>
                Image
              </Text>
            </Row> */}
          </View>
        </Row>
      </View>
    </ShareDrawer>
  );
}

export default ShareReceiptAs;

const styles = StyleSheet.create({
  shareItem: {
    // paddingHorizontal: 24,
    // paddingVertical: 16,
    borderBottomWidth: 1,
    borderColor: "#D4DBDE",
  },
  shareItemImg: {
    width: 50,
    height: 50,
    marginRight: 0,
    marginLeft: 0,
    marginBottom: 0,
    padding: 0,
  },
  drawerContainer: {
    shadowColor: "#171717",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    // paddingVertical: 8,
    elevation: 2,
  },
  detailValue: {
    fontFamily: "archivo-regular",
    fontSize: 14,
    color: theme.color.neutral700,
    // textTransform: 'capitalize'
  },
  headerSection: {
    paddingHorizontal: 24,
    paddingTop: 24,
    justifyContent: 'space-between'
  },
  headerTitle: {
    fontFamily: "archivo-regular600",
    fontSize: 18,
  },
  headerClose: {
    fontFamily: "archivo-regular",
    fontSize: 18,
  },
  glanceLogo: {
    width: 50,
    height: 40,
    marginTop: 3,
    marginRight: 0,
    marginLeft: 0,
    marginBottom: 0,
    padding: 0,
  },
});
