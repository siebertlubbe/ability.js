describe('Rule', function () {

  describe('creating a new rule', function () {

    it('should set actions to an array with the passed actions', function () {
      rule = new Rule({actions: ['read', 'write']});
      expect(rule.actions).toEqual(['read', 'write']);
    });

    it('should set subjects to an array with the passed subjects', function () {
      rule = new Rule({subjects: ['read', 'write']});
      expect(rule.subjects).toEqual(['read', 'write']);
    });

    it('should set conditions', function () {
      rule = new Rule({conditions: {'test': 'test'}});
      expect(rule.conditions).toEqual({'test': 'test'});
    });

    it('should set baseBehavior', function () {
      rule = new Rule({base_behavior: true});
      expect(rule.baseBehavior).toEqual(true);
    });

    describe('matchAll', function () {

      it('should set matchAll to false if only the subjects are undefined', function () {
        rule = new Rule({actions: 'manage'});
        expect(rule.matchAll).toBeFalsy();
      });

      it('should set matchAll to false if only the actions are undefined', function () {
        rule = new Rule({subjects: 'all'});
        expect(rule.matchAll).toBeFalsy();
      });

      it('should set matchAll to true if both the actions and the subjects are empty', function () {
        rule = new Rule({});
        expect(rule.matchAll).toBeTruthy();
      });

    });

  });

  describe('#relevant', function () {

    it('should return true if the rule has no actions or subjects', function () {
      rule = new Rule({});
      expect(rule.relevant('manage', 'all')).toBeTruthy();
    })

    it('should return true if both the action and subject matches the rule', function () {
      rule = new Rule({action: 'manage', subject: 'all'});
      expect(rule.relevant('action', 'subject')).toBeTruthy();
    });

  });

  describe('#matchesAction', function () {

    it('should return true if the rule action include manage', function () {
      rule = new Rule({
        "actions":["manage"],
      });
      expect(rule.matchesAction('test')).toEqual(true);
    });

    it('should return true if the passed action is in the rule action list', function () {
      rule = new Rule({
        "actions":["view"],
      });
      expect(rule.matchesAction('view')).toEqual(true);
    });

    it('should return false if the  action is not in the rule action list or is not manage', function () {
      rule = new Rule({
        "actions":["foo"],
      });
      expect(rule.matchesAction('bar')).toEqual(false);
    });

  });

  describe('#matchesSubject', function () {

    it('should return true if the rule subject include all', function () {
      rule = new Rule({
        "subjects":["all"],
      });
      expect(rule.matchesSubject('test')).toEqual(true);
    });

    it('should return true if the passed action is in the rule action list', function () {
      rule = new Rule({
        "subjects":["cp_user"],
      });
      expect(rule.matchesSubject('cp_user')).toEqual(true);
    });

  });

  describe('#matchesCondition', function () {

    it('should return true is no conditions are provided', function () {
      rule = new Rule({'conditions': {}});
      expect(rule.matchesConditions()).toBeTruthy();
    });

    it('should throw an exception if conditions are set', function () {
      rule = new Rule({'conditions': {'condition': 'test'}});
      expect(function () { rule.matchesConditions() }).toThrow();
    });

  });
});
