import React, { Component } from "react";
import { Text, View, TouchableOpacity } from "react-native";


class StepOne extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  nextStep = () => {
    const { next, saveState } = this.props;
    // Save state for use in other steps
    saveState({ name: "samad" });

    // Go to next step
    next();
  };

  goBack() {
    const { back } = this.props;
    // Go to previous step
    back();
  }

  render() {
    return (
      <View>
        <Text> Step 1 </Text>
        <View>
          <TouchableOpacity onPress={this.nextStep}>
            <Text>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default StepOne;