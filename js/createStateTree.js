export default function createStateTree(reducer, dispatcher) {
  const subject = new Rx.ReplaySubject(1);

  let _state = reducer();
  subject.onNext(_state);

  dispatcher.subscribe(action => {
    _state = reducer(_state, action);
    subject.onNext(_state);
  });

  return subject;
}
