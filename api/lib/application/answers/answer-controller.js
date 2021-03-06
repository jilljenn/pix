const Boom = require('boom');
const Answer = require('../../domain/models/data/answer');
const answerSerializer = require('../../infrastructure/serializers/jsonapi/answer-serializer');
const solutionRepository = require('../../infrastructure/repositories/solution-repository');
const answerRepository = require('../../infrastructure/repositories/answer-repository');
const solutionService = require('../../domain/services/solution-service');

function _updateExistingAnswer(existingAnswer, newAnswer, reply) {
  solutionRepository
    .get(existingAnswer.get('challengeId'))
    .then((solution) => {
      const answerCorrectness = solutionService.match(newAnswer, solution);
      new Answer({ id: existingAnswer.id })
        .save({
          result: answerCorrectness,
          value: newAnswer.get('value'),
          timeout: newAnswer.get('timeout'),
          challengeId: existingAnswer.get('challengeId'),
          assessmentId: existingAnswer.get('assessmentId')
        }, { method: 'update' })
        .then((updatedAnswer) => reply(answerSerializer.serialize(updatedAnswer)).code(200))
        .catch((err) => reply(Boom.badImplementation(err)));
    });
}

function _saveNewAnswer(newAnswer, reply) {
  solutionRepository
    .get(newAnswer.get('challengeId'))
    .then((solution) => {
      const answerCorrectness = solutionService.match(newAnswer, solution);
      newAnswer.set('result', answerCorrectness);
      newAnswer.set('timeout', newAnswer.get('timeout'));
      newAnswer.save()
        .then((newAnswer) => reply(answerSerializer.serialize(newAnswer)).code(201))
        .catch((err) => reply(Boom.badImplementation(err)));
    });
}

module.exports = {

  save(request, reply) {

    const newAnswer = answerSerializer.deserialize(request.payload);

    answerRepository
      .findByChallengeAndAssessment(newAnswer.get('challengeId'), newAnswer.get('assessmentId'))
      .then(existingAnswer => {
        if (!existingAnswer) {
          return _saveNewAnswer(newAnswer, reply);
        }
        return _updateExistingAnswer(existingAnswer, newAnswer, reply);
      });
  },

  get(request, reply) {

    new Answer({ id: request.params.id })
      .fetch()
      .then((answer) => reply(answerSerializer.serialize(answer)));
  },

  findByChallengeAndAssessment(request, reply) {
    answerRepository
      .findByChallengeAndAssessment(request.url.query.challenge, request.url.query.assessment)
      .then((answer) => {
        return reply(answerSerializer.serialize(answer)).code(200);
      })
      .catch((err) => reply(Boom.badImplementation(err)));
  }

};
