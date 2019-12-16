import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Button, Card, Overlay, withTheme } from "react-native-elements";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import MoodCardTag from "../MoodCardTag/MoodCardTag";
import Database from "../../database/database";

class MoodCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isSelected: false,
      isDeleteModalOpen: false
    };
  }

  getIconColorStyle = rating => {
    const { theme } = this.props;
    const toBgColor = color => {
      return { backgroundColor: color };
    };
    switch (true) {
      case rating >= 80:
        return toBgColor(theme.colors.primary);
      case rating >= 60:
        return toBgColor(theme.colors.secondary);
      case rating >= 40:
        return toBgColor(theme.colors.tertiary);
      case rating >= 20:
        return toBgColor(theme.colors.quaternary);
      default:
        return toBgColor(theme.colors.quinary);
    }
  };

  getIconName = rating => {
    switch (true) {
      case rating >= 80:
        return "emoticon-excited";
      case rating >= 60:
        return "emoticon-happy";
      case rating >= 40:
        return "emoticon-neutral";
      case rating >= 20:
        return "emoticon-sad";
      default:
        return "emoticon-dead";
    }
  };

  /**
   * Display edit / delete buttons when card is pressed.
   * Sets isSelected state to !isSelected
   */
  onCardPress = () => {
    this.setState({ isSelected: !this.state.isSelected });
  };

  onEditPress = () => {
    if (this.state.isSelected) {
      // Navigate to edit mood.
    }
  };

  /**
   * Opens delete overlay
   */
  onDeletePress = () => {
    if (this.state.isSelected) {
      // Open delete confirmation overlay.
      this.setState({ isDeleteModalOpen: true });
    }
  };

  /**
   * Closes delete overlay.
   * Submits query to database to delete this mood.
   * Tells entries screen we have removed a mood.
   */
  onDeleteConfirm = () => {
    let { mood } = this.props;
    // close modal and unselect.
    this.setState({ isDeleteModalOpen: false, isSelected: false });
    let db = new Database();
    // Submit query to delete mood.
    db.deleteMood(mood.id)
      .then(() => {
        this.props.onRemoveMood(mood.id);
      })
      .catch(error => {
        console.log("Error deleting mood", error);
      });
  };

  /**
   * Closes delete overlay
   */
  onDeleteCancel = () => {
    // Close delete confirmation overlay.
    this.setState({ isDeleteModalOpen: false });
  };

  render() {
    const { mood } = this.props;
    let colors = this.getIconColorStyle(mood.rating);
    return (
      <Card>
        {this.state.isSelected ? (
          <View style={styles.editMenu}>
            <TouchableOpacity onPress={this.onEditPress}>
              <MaterialIcons size={30} name="edit" color={"green"} />
            </TouchableOpacity>
            <TouchableOpacity onPress={this.onDeletePress}>
              <MaterialIcons size={30} name="delete" color={"red"} />
            </TouchableOpacity>
          </View>
        ) : (
          <></>
        )}
        <Overlay isVisible={this.state.isDeleteModalOpen}>
          <View>
            <Text>Are you sure you want to delete this entry?</Text>
            <Button title="Delete" onPress={this.onDeleteConfirm} />
            <Button title="Cancel" onPress={this.onDeleteCancel} />
          </View>
        </Overlay>
        <TouchableOpacity style={styles.cardWrapper} onPress={this.onCardPress}>
          <MaterialCommunityIcons
            size={40}
            name={this.getIconName(mood.rating)}
            color={colors.backgroundColor}
          />

          <View style={styles.dataContainer}>
            <View style={styles.dateTimeContainer}>
              <Text style={styles.date}>{mood.date}</Text>
              <Text style={styles.time}>{mood.time}</Text>
            </View>
            <View style={styles.tagContainer}>
              {mood.tags &&
                mood.tags.map((tag, index) => {
                  return (
                    <MoodCardTag
                      key={mood.id + "_tag_" + index}
                      tag={tag}
                      color={colors.backgroundColor}
                    />
                  );
                })}
            </View>
            {mood.note ? <Text style={styles.note}>{mood.note}</Text> : null}
          </View>
        </TouchableOpacity>
      </Card>
    );
  }
}

const styles = StyleSheet.create({
  cardWrapper: {
    flex: 1,
    flexDirection: "row"
  },
  dataContainer: {
    paddingLeft: 10,
    flex: 1,
    flexDirection: "column"
  },
  date: {
    fontSize: 16
  },
  editMenu: {
    backgroundColor: "rgba(255,255,255,1)",
    marginLeft: 250,
    flexDirection: "row",
    position: "absolute",
    zIndex: 100
  },
  time: {
    fontSize: 10
  },
  dateTimeContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  tagContainer: {
    paddingTop: 5,
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    flexWrap: "wrap"
  },
  note: {}
});

export default withTheme(MoodCard);
