describe("Appointments", () => {

	// default state for each run of the test with following
	beforeEach(() => {
	 cy.request("GET", "/api/debug/reset");
	 cy.visit("/");
	 cy.contains("Monday");
	});
 
	// test for appointment booking
	it("should book an interview", () => {
	 cy.get("[alt=Add]")
		.first()
		.click();
 
	 cy.get("[data-testid=student-name-input]").type("Lydia Miller-Jones");
	 cy.get('[alt="Sylvia Palmer"]').click();
 
	 cy.contains("Save").click();
 
	 cy.contains(".appointment__card--show", "Lydia Miller-Jones");
	 cy.contains(".appointment__card--show", "Sylvia Palmer");
	});	
	
	// test for appointment editing
	it("should edit an interview", () => {
	 cy.get("[alt=Edit]").first().click({ force: true })
	 cy.get("[data-testid=student-name-input]").type(" (Updated)");
	 cy.get('[alt="Tori Malcolm"]').click();

	 cy.contains("Save").click();
 
	 cy.contains(".appointment__card--show", "Archie Cohen (Updated)");
	 cy.contains(".appointment__card--show", "Tori Malcolm");

	});

	it("should cancel an interview", () => {
  cy.get("[alt=Delete]")
    .click({ force: true });

  cy.contains("Confirm").click();

  cy.contains(".appointment__card--show", "Archie Cohen")
    .should("not.exist");
});
 });