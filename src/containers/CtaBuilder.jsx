import React, { Component } from "react";
import Modal from "../components/Modal";
import LayoutChoose from "../components/LayoutChoose";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import EditTab from "../components/EditTab";
import Preview from "../components/Preview";
import Design from "../components/Design";
import CallToActionTab from "../components/CallToActionTab";
import SecondaryTextTab from "../components/SecondaryTextTab";
import ComplianceTab from "../components/ComplianceTab";
import BackgroundTab from "../components/BackgroundTab";
import LogoTab from "../components/LogoTab";
import FeaturedImageTab from "../components/FeaturedImageTab";
import MainButtonTab from "../components/MainButtonTab";
import TriggerButtonTab from "../components/TriggerButtonTab";
import ContactUsButtonTab from "../components/ContactUsButtonTab";
import SocialShare from "../components/SocialShare";
import ExportTab from "../components/ExportTab";
import TemplatesTab from "../components/TemplatesTab";
import LightPreview from "../components/LightPreview";
import { validateEmail, validURL } from '../utils/utils';
import shortLinks from "../services/shortLinks";
import { LAYOUT_NAMES, APP_CONFIG, TEMPLATES, getInitialData } from "../defines";
import ReactTooltip from 'react-tooltip';

class CtaBuilder extends Component {
  constructor(props) {
    super(props);

    this.shortTP = new shortLinks();
    this.shortT = new shortLinks();
    this.shortP = new shortLinks();

    this.connectedFonts = ["PT Sans"];

    const folder = window.location.href.split("#")[0];

    this.eventUpdate = new Event('updateApp');

    this.state = {
      isLayoutChoose: false,
      isTabsActive: window.innerWidth > 991 ? true : false,
      isMinimal: false,
      isSidebar: true,
      isSocialShare: false,
      isDesign: true,
      layout: null,
      layoutName: LAYOUT_NAMES[0],
      fontsList: [],
      isExportTab: false,
      isDesktop: true,
      toolTips: {
        isCallToActionTooltip: true,
        isMainButtonTooltip: true,
        isPreviewTooltip: true,
        isTriggerButtonTooltip: true,
        isExportTooltip: true,
        isTriggerOnlyTooltip: true,
      },
      tabs: {
        isSecondaryTextTab: false,
        isCallToActionTab: false,
        isComplianceTab: false,
        isBackgroundTab: false,
        isLogoTab: false,
        isFeaturedImageTab: false,
        isMainButtonTab: false,
        isTriggerButtonTab: false,
        isContactUsButtonTab: true,
      },
      behavior: {
        displayOnDesktop: true,
        displayOnMobile: true,
        position: "cta-position-br",
        bottom: 32,
        left: 32,
        right: 32,
        autoOpen: false,
        delay: 1000,
      },
      data: {
        isPowered: false,
        folder: folder,
        size: 21,
        color: '#2399F0',
        font: 'Open Sans',
        reason: 'Text DEMO to 555888',
        reasonAlign: 'center',
        reasonWeight: 'bold',
        reasonItalic: '',
        secondarySize: 15,
        secondaryFont: 'Rubik',
        secondaryColor: '#75849C',
        secondaryReason: 'We???ll send you a quick video that shows you how to use this tool to grow your subscriber list.',
        secondaryReasonAlign: 'center',
        secondaryReasonWeight: '',
        secondaryReasonItalic: '',
        company: 'Your Company Name',
        estimated: 4,
        email: 'email@domain.com',
        customPrivacy: false,
        terms: '',
        privacy: '',
        complianceFont: 'Rubik',
        complianceSize: 9,
        complianceColor: '#75849c',
        complianceAlign: 'center',
        complianceWeight: '',
        complianceItalic: '',
        logo: folder+'assets/templates/CTA-SimpleTexting_logo.png',
        logoStyle: 'boxed',
        logoAlign: 'center',
        logoMaxWidth: 130,
        hyperlink: '',
        image: folder+'assets/templates/CTA-SimpleTexting_hero.png',
        imageWidth: 350,
        imageAlign: 'center',
        imageStyle: 'boxed',
        position: 'cta-boxed',
        colorA: '#75849C',
        stroke: '#ffffff',
        background: '#FFFFFF',
        corner: 8,
        shadow: '0px 16px 64px rgba(0,0,0,0.08)',
        fontA: 'Rubik',
        sizeA: 16,
        width: 450,
        closePosition: "cta-close-tr",
        keyword: '',
        phone: '555888',
        shortTerms: '',
        shortTermsPrivacy: '',
        shortPrivacy: '',
    
        mainButtonFont: 'Rubik',
        mainButtonFontColor: '#ffffff',
        mainButtonFontSize: 16,
        mainButtonAlign: "center",
        mainButtonWeight: '',
        mainButtonItalic: '',
        mainButtonShadow: '0px 0px 0px rgba(0,0,0,0.0)',
        mainButtonCorner: 8,
        mainButtonStroke: "#2399F0",
        mainButtonBackground: "#2399F0",
        mainButtonLabel: "Watch a demo",
        mainButtonType: "cta-label-texticonl",
        mainButtonIcon: "pack-message-circle",
    
        triggerButtonFont: 'Rubik',
        triggerButtonFontColor: '#ffffff',
        triggerButtonFontSize: 16,
        triggerButtonAlign: "right",
        triggerButtonWeight: '',
        triggerButtonItalic: '',
        triggerButtonShadow: '0px 16px 64px rgba(0,0,0,0.08)',
        triggerButtonCorner: 8,
        triggerButtonStroke: "#2399F0",
        triggerButtonBackground: "#2399F0",
        triggerButtonLabel: "Watch a demo",
        triggerButtonType: "cta-label-texticonl",
        triggerButtonIcon: "pack-message-circle",
    
        textUsButtonNumber: '555888',
        textUsButtonText: '',
        textUsButtonFont: 'Rubik',
        textUsButtonFontColor: '#ffffff',
        textUsButtonFontSize: 16,
        textUsButtonAlign: "right",
        textUsButtonWeight: '',
        textUsButtonItalic: '',
        textUsButtonShadow: '0px 16px 64px rgba(0,0,0,0.08)',
        textUsButtonCorner: 8,
        textUsButtonStroke: "#2399F0",
        textUsButtonBackground: "#2399F0",
        textUsButtonLabel: "Watch a demo",
        textUsButtonType: "cta-label-texticonl",
        textUsButtonIcon: "pack-message-circle"
      }
    };

    this.modal = React.createRef();
    this.ExModal = React.createRef();
  }

  componentDidMount() {
    this.buildFontList();
    this.events();
    this.setTooltips();
    this.onFontchange(this.state.data.font);
    this.navigate();

    setTimeout(() => {
      document.querySelector("#loader").style.display = "none";
    }, 1000)
  }

  navigate = () => {
    let linkFromUrl = window.location.href.split("#");

    switch (linkFromUrl[linkFromUrl.length - 1]) {
      case "image-only":
        this.setState({ layoutName: LAYOUT_NAMES[0] });
        document.title = "SimpleTexting - Sign-Up Graphics";
        break;
      case "button-flyout":
        this.setState({ layoutName: LAYOUT_NAMES[1] });
        document.title = "SimpleTexting - Mobile Sign-Up Widget";
        break;
      case "click-to-text":
        this.setState({ layoutName: LAYOUT_NAMES[2] });
        document.title = "SimpleTexting - Click-to-Text Button";
        break;
      default:
        setTimeout(() => {
          this.setState({ isLayoutChoose: true });
        }, 2000)
    }
  }

  setTooltip = (tooltip) => {

    const { toolTips } = this.state;

    if (APP_CONFIG.isTooltipsCanHide) {
      localStorage.setItem('cta-builder-' + tooltip, "viewed")

      toolTips[tooltip] = false;
    }

  }

  setTooltips = () => {

    let isCallToActionTooltip = localStorage.getItem('cta-builder-isCallToActionTooltip') == "viewed" ? false : true;
    let isMainButtonTooltip = localStorage.getItem('cta-builder-isMainButtonTooltip') == "viewed" ? false : true;
    let isPreviewTooltip = localStorage.getItem('cta-builder-isPreviewTooltip') == "viewed" ? false : true;
    let isTriggerButtonTooltip = localStorage.getItem('cta-builder-isTriggerButtonTooltip') == "viewed" ? false : true;
    let isExportTooltip = localStorage.getItem('cta-builder-isExportTooltip') == "viewed" ? false : true;
    let isTriggerOnlyTooltip = localStorage.getItem('cta-builder-isTriggerOnlyTooltip') == "viewed" ? false : true;

    this.setState({
      toolTips: {
        isCallToActionTooltip: isCallToActionTooltip,
        isMainButtonTooltip: isMainButtonTooltip,
        isPreviewTooltip: isPreviewTooltip,
        isTriggerButtonTooltip: isTriggerButtonTooltip,
        isExportTooltip: isExportTooltip,
        isTriggerOnlyTooltip: isTriggerOnlyTooltip,
      }
    });

  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.onEscape, false);
    window.removeEventListener("resize", () => { }, false);
  }

  events = () => {

    document.addEventListener("keydown", this.onEscape, false);
    window.addEventListener("resize", () => {
      const { isSidebar } = this.state;

      if (window.innerWidth < 991) {
        if (isSidebar) this.setState({ isSidebar: false })
      } else {
        if (!isSidebar) this.setState({ isSidebar: true })
      }
    });

    // document.addEventListener("click", (e) => {
    //   if (e.target.closest('.cta-edittab') == null && e.target.closest('.cta-content-container') == null && e.target.closest('.pcr-app') == null && e.target.closest('.cta-select__menu') == null) {
    //     this.onCloseTabs();
    //   }
    // });
  }

  onEscape = (e) => {
    if (e.keyCode === 27) {
      this.onCloseTabsContainer();
    }
  }

  onCloseTabs = (instead, calback) => {
    const { tabs } = this.state;
    for (let i in tabs) {
      if (instead) {
        if (instead != i) tabs[i] = false;
      } else {
        tabs[i] = false;
      }
    }
    this.setState({ tabs }, calback);
  }

  buildFontList = () => {

    if (APP_CONFIG.isFullFontsList) {
      let xmlHttp = new XMLHttpRequest();
      xmlHttp.onreadystatechange = () => {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
          this.parseFonts(xmlHttp.responseText);
      }
      xmlHttp.open("GET", "https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyAOR6q9DsvkdMf-FiTVeE0MWDAfWCiT91k", true);
      xmlHttp.send(null);
    } else {
      this.setState({ fontsList: APP_CONFIG.fonts });
    }

    TEMPLATES.forEach((template)=>{

      if(this.connectedFonts.indexOf(template.font) == -1) {
        this.connectedFonts.push(template.font)
        this.addStyle("https://fonts.googleapis.com/css?family=" + template.font + ":400,500,700&display=swap");
      }

      if(this.connectedFonts.indexOf(template.secondaryFont) == -1) {
        this.connectedFonts.push(template.secondaryFont)
        this.addStyle("https://fonts.googleapis.com/css?family=" + template.secondaryFont + ":400,500,700&display=swap");
      }

      if(this.connectedFonts.indexOf(template.complianceFont) == -1) {
        this.connectedFonts.push(template.complianceFont)
        this.addStyle("https://fonts.googleapis.com/css?family=" + template.complianceFont + ":400,500,700&display=swap");
      }

      if(this.connectedFonts.indexOf(template.fontA) == -1) {
        this.connectedFonts.push(template.fontA)
        this.addStyle("https://fonts.googleapis.com/css?family=" + template.fontA + ":400,500,700&display=swap");
      }

      if(this.connectedFonts.indexOf(template.mainButtonFont) == -1) {
        this.connectedFonts.push(template.mainButtonFont)
        this.addStyle("https://fonts.googleapis.com/css?family=" + template.mainButtonFont + ":400,500,700&display=swap");
      }

      if(this.connectedFonts.indexOf(template.triggerButtonFont) == -1) {
        this.connectedFonts.push(template.triggerButtonFont)
        this.addStyle("https://fonts.googleapis.com/css?family=" + template.triggerButtonFont + ":400,500,700&display=swap");
      }

      if(this.connectedFonts.indexOf(template.textUsButtonFont) == -1) {
        this.connectedFonts.push(template.textUsButtonFont)
        this.addStyle("https://fonts.googleapis.com/css?family=" + template.textUsButtonFont + ":400,500,700&display=swap");
      }
      
    });
  }

  addStyle = (url) => {
    const head = document.getElementsByTagName('head')[0];
    const link = document.createElement('link');

    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = url;
    link.media = 'all';
    head.appendChild(link);
  }

  onFontchange = (fontName) => {
    this.addStyle("https://fonts.googleapis.com/css?family=" + fontName + ":400,500,700&display=swap");
  }

  parseFonts = (dataFonts) => {
    dataFonts = JSON.parse(dataFonts);
    this.setState({
      ...this, fontsList: dataFonts.items.map((font) => {
        return { value: font.family, label: font.family }
      })
    });
  };

  onLayoutChoose = (layout) => {
    const { data } = this.state;

    switch (LAYOUT_NAMES[layout]) {
      case LAYOUT_NAMES[0]:
        window.history.pushState({}, "SimpleTexting - Sign-Up Graphics", data.folder + "#image-only");
        document.title = "SimpleTexting - Sign-Up Graphics";
        break;
      case LAYOUT_NAMES[1]:
        window.history.pushState({}, "SimpleTexting - Mobile Sign-Up Widget", data.folder + "#button-flyout");
        document.title = "SimpleTexting - Mobile Sign-Up Widget";
        break;
      case LAYOUT_NAMES[2]:
        window.history.pushState({}, "SimpleTexting - Click-to-Text Button", data.folder + "#click-to-text");
        document.title = "SimpleTexting - Click-to-Text Button";
        break;
      default:

    }

    this.setState({ layout: layout, layoutName: LAYOUT_NAMES[layout], isLayoutChoose: false, isMinimal: layout == 2 ? true : false }, () => {
      document.dispatchEvent(this.eventUpdate);
    });
  }

  onViewChange = (is) => {

    if (!is) {
      this.onCloseTabsContainer();
      this.setTooltip("isPreviewTooltip");
    } else {
      this.onShowTabs();
    }
    this.setState({ isDesign: is });
  }

  onLayoutToggler = () => {
    const { isLayoutChoose } = this.state;
    this.setState({ isLayoutChoose: !isLayoutChoose });
  }

  onLayoutChooseClose = () => {
    this.setState({ isLayoutChoose: false });
  }

  onUpdate = (data) => {
    this.setState({ data }, () => {
      document.dispatchEvent(this.eventUpdate);
    })
  }

  onBehaviorUpdate = (behavior) => {
    this.setState({ behavior });
  }

  onUpdateTabs = (tabs) => {
    if (tabs.isCallToActionTab) this.setTooltip("isCallToActionTooltip");
    if (tabs.isSecondaryTextTab) this.setTooltip("isSecondaryTextTooltip");
    if (tabs.isMainButtonTab) this.setTooltip("isMainButtonTooltip");
    this.setState({ isTabsActive: true, tabs });
  }

  onCloseSidebar = () => {
    this.setState({ isSidebar: false });
  }

  onShowSidebar = () => {
    this.setState({ isSidebar: true });
  }

  onSocialToggle = () => {
    const { isSocialShare } = this.state;
    this.setState({ isSocialShare: !isSocialShare });
  }

  onExportToggle = () => {
    const { isExportTab, data } = this.state;
    if (!isExportTab) this.setTooltip("isExportTooltip");
    this.setState({ isExportTab: !isExportTab }, () => {

      if (!isExportTab) {

        if (data.customPrivacy) {

          if (validURL(data.privacy)) this.shortP.set(data.privacy, (link) => {
            data.shortPrivacy = link;
          });

          if (validURL(data.terms)) this.shortP.set(data.terms, (link) => {
            data.shortTerms = link;

            this.setState({ data:data })
          });

        } else {

          let pdata = this.b64EncodeUnicode(JSON.stringify({ email: data.email, company: data.company }));
          let url = data.folder + "privacy/?d=" + pdata;

          if (validateEmail(data.email) && (data.company.length > 0)) this.shortTP.set(url, (link) => {
            data.shortTermsPrivacy = link;
            
            this.setState({ data:data })
          });
        }
      }
    });
  }

  b64EncodeUnicode = (str) => {
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
      function toSolidBytes(match, p1) {
        return String.fromCharCode('0x' + p1);
      }));
  }

  onExportTabClose = () => {
    this.setState({ isExportTab: false });
  }

  onSocialShareClose = () => {
    this.setState({ isSocialShare: false });
  }

  clearInputs = () => {
    let textareas = document.querySelectorAll("textarea");
    textareas.forEach((textarea) => {
      textarea.value = '';
    });
    this.setState({ data: getInitialData() });
  }

  toggle = (name) => {

    const { tabs } = this.state;

    tabs[name] = !tabs[name];
    this.setState({ tabs: tabs });

    this.onCloseTabs(name);
  }

  onCloseTabsContainer = () => {
    this.setState({ isTabsActive: false });
  }

  onShowTabs = () => {
    setTimeout(() => {
      this.setState({ isTabsActive: true });
    }, 100);

  }

  chooseTemplate = (i) => {

    this.setState({data:TEMPLATES[i]}, ()=>{
      document.dispatchEvent(this.eventUpdate);
    })
  }

  onSetDevice = (state) => {
    this.setState({isDesktop:state});
  }

  render() {
    const {
      isLayoutChoose,
      isDesign,
      layoutName,
      tabs,
      fontsList,
      data,
      isMinimal,
      behavior,
      isSidebar,
      isSocialShare,
      isExportTab,
      toolTips,
      isMenuOpen,
      isTabsActive,
      isDesktop
    } = this.state;

    return (
      <div className="cta-builder">
        <Header
          isDesign={isDesign}
          data={data}
          layoutName={layoutName}
          onExportToggle={this.onExportToggle}
          onSocialToggle={this.onSocialToggle}
          onLayoutToggler={this.onLayoutToggler}
          onViewChange={this.onViewChange}
          toolTips={toolTips}
        />
        <div className="cta-view">
          {/* <Sidebar
            onClose={this.onCloseSidebar}
            onShow={this.onShowSidebar}
            behavior={behavior}
            onUpdate={this.onBehaviorUpdate}
            isMinimal={isMinimal}
            isActive={(layoutName == LAYOUT_NAMES[1] || layoutName == LAYOUT_NAMES[2])}
            isSidebar={isSidebar}
            isDesign={isDesign}
          /> */}
          <Design setTooltip={this.setTooltip} clearInputs={this.clearInputs} isDesign={isDesign} behavior={behavior} toolTips={toolTips} layoutName={layoutName} tabs={tabs} onUpdateTabs={this.onUpdateTabs} data={data} isActive={isDesign} />
          <Preview onDontShow={() => { }} onSetDevice={this.onSetDevice} onRemindLater={() => { }} setTooltip={this.setTooltip} isDesign={isDesign} behavior={behavior} toolTips={toolTips} layoutName={layoutName} tabs={tabs} onUpdateTabs={this.onUpdateTabs} data={data} isActive={!isDesign} />
          <ReactTooltip place="bottom" className="tolltip-basic" effect="solid" />
          <div className={`cta-tabs ${isTabsActive ? 'active' : ''}`}>
            <div className="cta-tabs-close" onClick={this.onCloseTabsContainer}><i className="icon-close"></i></div>
            <EditTab onClose={this.onCloseTabs} isHided={layoutName == LAYOUT_NAMES[2]} isActive={tabs.isTemplatesTab} toggle={this.toggle} name="isTemplatesTab" title="Start with template" content={
              <TemplatesTab behavior={behavior} chooseTemplate={this.chooseTemplate}/>
            } />
            <EditTab onClose={this.onCloseTabs} isHided={layoutName == LAYOUT_NAMES[2]} isActive={tabs.isBackgroundTab} toggle={this.toggle} name="isBackgroundTab" title="Styling" content={
              <BackgroundTab
                data={data}
                onUpdate={this.onUpdate} />
            } />
            <EditTab onClose={this.onCloseTabs} isHided={(layoutName == LAYOUT_NAMES[0] || layoutName == LAYOUT_NAMES[2])} isActive={tabs.isTriggerButtonTab} toggle={this.toggle} name="isTriggerButtonTab" title="Trigger button" content={
              <TriggerButtonTab
                data={data}
                behavior={behavior}
                fontsList={fontsList}
                onUpdateB={this.onBehaviorUpdate}
                onFontchange={this.onFontchange}
                onUpdate={this.onUpdate} />
            } />
            <EditTab onClose={this.onCloseTabs} isHided={layoutName == LAYOUT_NAMES[2]} isActive={tabs.isLogoTab} toggle={this.toggle} name="isLogoTab" title="Logo" content={
              <LogoTab
                data={data}
                onUpdate={this.onUpdate} />
            } />
            <EditTab onClose={this.onCloseTabs} isHided={layoutName == LAYOUT_NAMES[2]} isActive={tabs.isFeaturedImageTab} toggle={this.toggle} name="isFeaturedImageTab" title="Hero image" content={
              <FeaturedImageTab
                data={data}
                onUpdate={this.onUpdate} />
            } />
            <EditTab onClose={this.onCloseTabs} isHided={layoutName == LAYOUT_NAMES[2]} isActive={tabs.isCallToActionTab} toggle={this.toggle} name="isCallToActionTab" title="Headline" content={
              <CallToActionTab
                data={data}
                fontsList={fontsList}
                onFontchange={this.onFontchange}
                onUpdate={this.onUpdate}
              />
            } />
            <EditTab onClose={this.onCloseTabs} isHided={layoutName == LAYOUT_NAMES[2]} isActive={tabs.isSecondaryTextTab} toggle={this.toggle} name="isSecondaryTextTab" title="Subheading" content={
              <SecondaryTextTab
                data={data}
                fontsList={fontsList}
                onFontchange={this.onFontchange}
                onUpdate={this.onUpdate} />
            } />
            <EditTab onClose={this.onCloseTabs} isHided={layoutName == LAYOUT_NAMES[0] || layoutName == LAYOUT_NAMES[1]} isActive={tabs.isContactUsButtonTab} toggle={this.toggle} name="isContactUsButtonTab" title="Click-to-text button" content={
              <ContactUsButtonTab
                data={data}
                behavior={behavior}
                fontsList={fontsList}
                onUpdateB={this.onBehaviorUpdate}
                onFontchange={this.onFontchange}
                onUpdate={this.onUpdate} />
            } />
            <EditTab onClose={this.onCloseTabs} isHided={(layoutName == LAYOUT_NAMES[0] || layoutName == LAYOUT_NAMES[2])} isActive={tabs.isMainButtonTab} toggle={this.toggle} name="isMainButtonTab" title="Main button" content={
              <MainButtonTab
                data={data}
                fontsList={fontsList}
                onFontchange={this.onFontchange}
                onUpdate={this.onUpdate} />
            } />
            <EditTab onClose={this.onCloseTabs} isHided={layoutName == LAYOUT_NAMES[2]} isActive={tabs.isComplianceTab} toggle={this.toggle} name="isComplianceTab" title="Legal footer" content={
              <ComplianceTab
                data={data}
                fontsList={fontsList}
                onFontchange={this.onFontchange}
                onUpdate={this.onUpdate} />
            } />
          </div>
        </div>
        <Modal isOpen={isLayoutChoose} overlayClose={false} onClose={this.onLayoutChooseClose} type="cta-modal-cm" content={<LayoutChoose onLayoutChoose={this.onLayoutChoose} />} />
        <Modal isOpen={isSocialShare} overlayClose={true} onClose={this.onSocialShareClose} content={<SocialShare />} />
        <Modal isOpen={isExportTab} overlayClose={true} close={true} onClose={this.onExportTabClose} type="cta-modal-tab" content={<ExportTab modal={this.modal} isExportTab={isExportTab} data={data} behavior={behavior} layoutName={layoutName} preview={<LightPreview modal={this.modal} isDesign={isDesign} behavior={behavior} layoutName={layoutName} data={data} isActive={!isDesign} />} />} />
        <div className={'cta-copyright ' + `${!isDesign ? 'on-preview ' : ''}` + `${!isDesktop ? 'on-phone' : ''}` + `${layoutName == LAYOUT_NAMES[0] ? 'on-image' : ''}`}>?? Copyright 2020  <a href="https://simpletexting.com/" target="_blank">SimpleTexting.com</a>. All rights reserved. </div>
      </div>
    );
  }
}

export default CtaBuilder;