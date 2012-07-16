describe('Ability', function () {

  describe('rules', function () {
    var currentAbility;

    beforeEach(function () {
      currentAbility = {"rules":[
        {"actions":["manage"],"subjects":["all"]},
        {"actions":["read"],"subjects":["posts"]}
      ]}
    });

    it('should create a rule for every rule object in the provided currentAbility', function () {
      ability = new Ability(currentAbility);
      expect(ability.rules.length).toEqual(2);
      _(ability.rules).each(function (rule) {
        expect(rule instanceof Rule).toBeTruthy;
      });
    });

  });

  describe('#can', function () {
    var currentAbility;
    var ability;

    beforeEach(function () {
      currentAbility = {"rules":[
        {"actions":["read"],"subjects":["posts"]}
      ]};
      ability = new Ability(currentAbility);
    });

    it('should return true if the subject and action matches an exist rule', function () {
      expect(ability.can('read', 'posts')).toBeTruthy();
    });

    it('should return false if the subject and action does not match any exist rules', function () {
      expect(ability.can('create', 'posts')).toBeFalsy();
    });

  });

  describe('#relevant_rules', function () {
    var currentAbility;
    var ability;

    beforeEach(function () {
      currentAbility = {"rules":[
        {"actions":["create"],"subjects":["posts"]},
        {"actions":["read"],"subjects":["posts"]}
      ]};
      ability = new Ability(currentAbility);
    });

    it('should return the rules relevant to the subject and action', function () {
      relevant_rules = ability.relevant_rules('read', 'posts');
      expect(relevant_rules.length).toEqual(1);
      expect(relevant_rules[0].actions).toEqual(['read']);
      expect(relevant_rules[0].subjects).toEqual(['posts']);
    });

  });

});
