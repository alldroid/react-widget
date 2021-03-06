import React, { Component } from "react";
import autosize from "../utils/autosize";
import html2canvas from 'html2canvas';

import { LAYOUT_NAMES } from "../defines"

class ExportTab extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tab: 'Get code',
    };

    this.codeArea = React.createRef();
    this.codeLines = React.createRef();
    this.codeCopy = React.createRef();
  }

  componentDidMount() {
    autosize(this.codeArea.current);
    this.buildCode();
  }

  componentDidUpdate(prevProps) {
    const { isExportTab, layoutName } = this.props;

    if (!isExportTab == prevProps.isExportTab) {
      this.buildCode();
      this.setState({ tab: layoutName == LAYOUT_NAMES[0] ? "Image" : "Get code" });
    }
  }

  onDownloadImage = () => {
    let { modal } = this.props;

    modal = modal.current.cloneNode(true);
    

    const container = document.createElement("div");
    container.classList.add("cta-design", "render", "preview");
    const content = document.createElement("div");
    content.classList.add("cta-content-container");

    container.appendChild(content);
    content.appendChild(modal);

    document.body.appendChild(container);

    modal.classList.add("for-render");

    html2canvas(modal, { allowTaint: true, useCORS: true})
      .then(function (canvas) {
        var link = document.createElement('a');
        link.download = 'preview.png';
        link.href = canvas.toDataURL("image/png");
        link.click();
        modal.classList.remove("for-render");
        container.remove();
      })
      .catch(function (error) {
        console.error('oops, something went wrong!', error);
      });

  }

  onTabChange = (tab) => {
    this.setState({ tab: tab });
  }

  buildCode = () => {
    const { data, behavior, layoutName } = this.props;

    this.codeArea.current.value = "<script>\nvar ctaData;\n(function (d, l, i, h, s) {\nh = d.getElementsByTagName('head')[0];\ns = d.createElement('script');\ns.async = 1;\ns.src = l;\nctaData = i;\nh.appendChild(s);\n}(document, '" + data.folder + "assets/ctaviewer.js?v=1.0', '" + this.b64EncodeUnicode(JSON.stringify({ data: data, behavior: behavior, layoutName: layoutName })) + "'));\n</script>";
    autosize.update(this.codeArea.current);
    this.buildCodeLines();
    document.querySelector(".cta-builder-copy").classList.remove("disabled");
  }

  buildCodeLines = () => {
    this.codeLines.current.value = '';
    let text = this.codeArea.current.value;
    let lines = text.split(/\r|\r\n|\n/);
    let count = 200;

    for (let i = 1; i < count + 1; i++) {
      this.codeLines.current.value += i + "\n";
    }
  }

  b64EncodeUnicode = (str) => {
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
      function toSolidBytes(match, p1) {
        return String.fromCharCode('0x' + p1);
      }));
  }

  toSolidBytes = (match, p1) => {
    return String.fromCharCode('0x' + p1);
  }

  onCopyCode = (e) => {
    let text = this.codeArea.current;
    text.select();
    text.setSelectionRange(0, 99999);
    document.execCommand("copy");

    this.codeCopy.current.classList.add("disabled");

    setTimeout(() => {
      this.codeCopy.current.classList.remove("disabled");
    }, 2000);
  }

  render() {

    const { tab } = this.state;
    const { preview, layoutName } = this.props;

    return (
      <div className="cta-tab-static">
        <div className="cta-tab-content">
          <div className="cta-group-title">
            <h2>Embed your widget</h2>
            <div className={`cta-links in-tab ${LAYOUT_NAMES[0] == layoutName ? "reverse" : ''}`}>
              <div className={`cta-link ${tab == "Get code" ? 'active' : ''}`} onClick={() => { this.onTabChange("Get code") }}>Get code</div>
              <div className={`cta-link ${LAYOUT_NAMES[0] != layoutName ? "d-none" : ''} ${tab == "Image" ? 'active' : ''}`} onClick={() => { this.onTabChange("Image") }}>Image</div>
            </div>
          </div>
          <div className={`cta-tab ${tab == "Get code" ? 'active' : ''}`}>
            <div className="cta-group bb-0 mb-0">
              <p className="text-basic mb-d">{`${LAYOUT_NAMES[0] == layoutName ? "Paste this code wherever you want your graphic to appear." : (LAYOUT_NAMES[1] == layoutName) || (LAYOUT_NAMES[2] == layoutName) ? 'Paste this code in the footer of the pages where you want your button to appear.' : ''}`}</p>
              <div className="cta-builder-code">
                <div className="cta-builder-lines">
                  <textarea rows="1" ref={this.codeLines}></textarea>
                </div>
                <div className="cta-builder-script">
                  <div className="cta-builder-copy" ref={this.codeCopy} onClick={this.onCopyCode}>
                    <i className="icon-copy"></i>
                    <div>
                      <span>Copy</span>
                      <span>Copied</span>
                    </div>
                  </div>
                  <textarea rows="1" ref={this.codeArea}></textarea>
                </div>
              </div>
            </div>
          </div>
          <div className={`cta-tab fixed ${tab == "Image" ? 'active' : ''}`}>
            <div className="cta-group d-stretch bb-0">
              <div>
                <p className="text-basic mb-d">Export the graphic you created.</p>
                <div><div className="btn-outline-bold mb-d" onClick={this.onDownloadImage}>Download as JPG</div></div>
              </div>
              <div className="cta-image-preview">
                {preview}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ExportTab;