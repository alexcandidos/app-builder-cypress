/// <reference types="cypress" />

const portlet =
  "#_com_liferay_product_navigation_product_menu_web_portlet_ProductMenuPortlet_portlet_com_liferay_app_builder_web_internal_portlet_ObjectsPortlet";

const sidebar =
  "#_com_liferay_product_navigation_product_menu_web_portlet_ProductMenuPortlet_sidenavToggleId";
describe("Open Liferay", () => {
  beforeEach(() => {
    Cypress.Cookies.defaults({
      preserve: [
        "JSESSIONID",
        "LFR_SESSION_STATE_20126",
        "SCREEN_NAME",
        "COMPANY_ID",
        "GUEST_LANGUAGE_ID",
        "LFR_SESSION_STATE_20103",
        "COOKIE_SUPPORT",
      ],
    });
  });

  it("should open portal and sign-in", () => {
    cy.visit("http://localhost:8080");

    cy.get("span.sign-in a").click();

    cy.get("#_com_liferay_login_web_portlet_LoginPortlet_login")
      .clear()
      .type("test@liferay.com");
    cy.get("#_com_liferay_login_web_portlet_LoginPortlet_password").type(
      "test"
    );

    cy.get(".button-holder button").click();
  });

  xit("should open app-builder object", () => {
    cy.get(sidebar).click();
    cy.get(
      "#_com_liferay_product_navigation_product_menu_web_portlet_ProductMenuPortlet_control_panelHeading"
    ).click();

    cy.get("#panel-manage-control_panel_app_builder").within(() => {
      cy.get("li").last().get("a").click({ force: true, multiple: true });
    });

    cy.get(portlet).click({ force: true });

    cy.wait(5000);
    cy.get(sidebar).click();
  });

  it("Should open app-builder object", () => {
    cy.wait(1000);

    cy.visit(
      "http://localhost:8080/group/guest/~/control_panel/manage?p_p_id=com_liferay_app_builder_web_internal_portlet_ObjectsPortlet&p_p_lifecycle=0&p_p_state=maximized&p_p_mode=view&p_p_auth=nJtkHAUa%2F#/"
    );

    cy.wait(1000);
  });

  it("should create an custom object and go to form view", () => {
    const randomName = `Look at this Alex ${(Math.random() * 100).toFixed()}`;
    cy.get('button[data-title="New Custom Object"]').click();

    cy.get(".popover.mw-100").within(() => {
      // cy.get('input[type="checkbox"]').should('be.checked').uncheck()
      cy.get("#customObjectNameInput").type(`${randomName} {enter}`, {
        delay: 100,
      });
    });
  });

  it("create and save formview", () => {
    cy.get('[data-field-type-name="text"]').dblclick();
    cy.get(".ddm-form-page-container.tabbed").within(() => {
      cy.get("input").eq(0).type("Player Name");
      cy.get("input").eq(1).type("Insert the Player Name");
      cy.get("input").eq(2).type("Hope this message help you");

      cy.get(".toggle-switch-check").check();
    });

    cy.get(
      ".app-builder-upper-toolbar.component-tbar.subnav-tbar-light.tbar"
    ).within(() => {
      cy.get('[placeholder="Untitled Form View"]').type("Liferay Form View");
      cy.get("button.btn-primary").click();
    });
  });

  it("open table view", () => {
    cy.get(".navbar-collapse.collapse").within(() => {
      cy.get(".nav-link").eq(1).click();
    });

    cy.get(".taglib-empty-result-message").within(() => {
      cy.get("button").click();
    });
  });

  it("select the player and save", () => {
    cy.get(".autofit-row.autofit-row-center.field-type").dblclick();

    cy.get(
      ".app-builder-upper-toolbar.component-tbar.subnav-tbar-light.tbar"
    ).within(() => {
      cy.get('[placeholder="Untitled Table View"]').type("Liferay Table View");
      cy.get("button.btn-primary").click();
    });
  });

  it("select and create an app", () => {
    cy.get(".navbar-collapse.collapse").within(() => {
      cy.get(".nav-link").eq(2).click();
    });

    cy.get(".taglib-empty-result-message").within(() => {
      cy.get("button").click();
    });

    cy.get('[placeholder="Untitled App"]').type("Liferay Demo App", {
      delay: 100,
    });
    cy.get("tbody tr").click();

    cy.get("button.btn-primary").click();

    cy.get("tbody tr").click();
    cy.get("button.btn-primary").click();

    cy.get(".toggle-switch-check").eq(1).check();
    cy.get("button.btn-primary").click();
  });

  it("Open Standalone", () => {
    cy.get(".dropdown-toggle.page-link.btn.btn-unstyled").click();
    cy.get(".dropdown-menu.show").within(() => {
      cy.get("button").eq(1).click();
    });
  });
});
