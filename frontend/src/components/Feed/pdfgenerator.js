import React, { PureComponent } from "react";

import jsPDF from "jspdf";

export default class PDFGenerator extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }
  jsPdfGenerator = () => {
    var doc = new jsPDF("p", "pt");

    // var imgData = "data:image/this.jsPdfGenerator;base64," + Base64.encode();

    doc.text(
      50,
      100,
      String(this.props.details.type + " - " + this.props.details.record_type)
    );

    doc.text(50, 130, String("Gender : " + this.props.details.gender));
    doc.text(
      50,
      160,
      String("Date : " + this.props.details.missing_date).substr(0, 17)
    );
    doc.text(
      50,
      190,
      String(
        "location" +
          this.props.details.location +
          " (" +
          this.props.details.latitude +
          ", " +
          this.props.details.longitude +
          ")"
      )
    );

    doc.setFont("courier");

    //save the doc
    doc.save("generated.pdf");
  };
  render() {
    return (
      <div>
        <button onClick={this.jsPdfGenerator}>Generate PDF</button>
      </div>
    );
  }
}
