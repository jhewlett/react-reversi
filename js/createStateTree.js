export default function createStateTree(reducer, dispatcher) {
  const subject = new Rx.ReplaySubject(1);

  let _state = reducer();
  subject.onNext(_state);

  dispatcher.subscribe(action => {
    const newState = reducer(_state, action);

    if (newState !== _state) {
      _state = newState;
      subject.onNext(_state);
    }
  });

  return subject;
}
