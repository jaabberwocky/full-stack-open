(this.webpackJsonpphonebook = this.webpackJsonpphonebook || []).push([
    [0],
    {
        23: function (e, t, n) {},
        43: function (e, t, n) {
            'use strict';
            n.r(t);
            var r = n(1),
                s = n.n(r),
                c = n(16),
                a = n.n(c),
                o = (n(23), n(3)),
                u = n(6),
                i = n.n(u),
                l = '/api/persons',
                j = {
                    createPerson: function (e) {
                        return i.a.post(l, e).then(function (e) {
                            return e.data;
                        });
                    },
                    getAll: function () {
                        return i.a.get(l).then(function (e) {
                            return e.data;
                        });
                    },
                    deletePerson: function (e) {
                        return i.a.delete(l + '/'.concat(e)).then(function (e) {
                            return e.data;
                        });
                    },
                    updatePerson: function (e, t) {
                        return i.a.put(l + '/'.concat(e), t).then(function (e) {
                            return e.data;
                        });
                    },
                },
                b = n(18),
                d = n(17),
                f = n(0),
                m = function (e) {
                    var t = e.persons,
                        n = e.setPersons,
                        r = e.setNewName,
                        s = e.setNewNumber,
                        c = e.newName,
                        a = e.newNumber,
                        u = e.setSuccessMessage,
                        i = e.setErrorMessage;
                    return Object(f.jsx)('div', {
                        children: Object(f.jsxs)('form', {
                            onSubmit: function (e) {
                                e.preventDefault();
                                var l,
                                    f = { name: c, number: a },
                                    m = Object(d.a)(t.entries());
                                try {
                                    var h = function () {
                                        var e = Object(o.a)(l.value, 2),
                                            c = e[0],
                                            a = e[1];
                                        if (f.name === a.name) {
                                            var u = window.confirm(
                                                ''.concat(
                                                    f.name,
                                                    ' is already added to phonebook, replace the old number with a new one?'
                                                )
                                            );
                                            return (
                                                r(''),
                                                s(''),
                                                u
                                                    ? (j
                                                          .updatePerson(a.id, f)
                                                          .then(function () {
                                                              var e = Object(
                                                                  b.a
                                                              )(t);
                                                              (e[c] = f), n(e);
                                                          })
                                                          .catch(function (e) {
                                                              i(
                                                                  'Information of '.concat(
                                                                      f.name,
                                                                      ' cannot be updated as it is not found on server'
                                                                  )
                                                              );
                                                          }),
                                                      { v: void 0 })
                                                    : { v: void 0 }
                                            );
                                        }
                                    };
                                    for (m.s(); !(l = m.n()).done; ) {
                                        var O = h();
                                        if ('object' === typeof O) return O.v;
                                    }
                                } catch (v) {
                                    m.e(v);
                                } finally {
                                    m.f();
                                }
                                j.createPerson(f)
                                    .then(function (e) {
                                        n(t.concat(e)),
                                            r(''),
                                            s(''),
                                            u(''.concat(e.name, ' added'));
                                    })
                                    .catch(function (e) {
                                        i(''.concat(e.response.data.error));
                                    });
                            },
                            children: [
                                Object(f.jsxs)('div', {
                                    children: [
                                        Object(f.jsx)('h2', {
                                            children: 'Add a new entry',
                                        }),
                                        'name: ',
                                        Object(f.jsx)('input', {
                                            value: c,
                                            onChange: function (e) {
                                                r(e.target.value);
                                            },
                                        }),
                                        Object(f.jsx)('br', {}),
                                        'number: ',
                                        Object(f.jsx)('input', {
                                            value: a,
                                            onChange: function (e) {
                                                s(e.target.value);
                                            },
                                        }),
                                    ],
                                }),
                                Object(f.jsx)('button', {
                                    type: 'submit',
                                    children: 'add',
                                }),
                            ],
                        }),
                    });
                },
                h = function (e) {
                    var t = e.message,
                        n = e.setErrorMessage,
                        s = e.delay;
                    return (
                        Object(r.useEffect)(function () {
                            return setTimeout(function () {
                                return n(null);
                            }, s);
                        }),
                        null === t
                            ? null
                            : Object(f.jsx)('div', {
                                  className: 'error',
                                  children: t,
                              })
                    );
                },
                O = function (e) {
                    var t = e.message,
                        n = e.setSuccessMessage,
                        s = e.delay;
                    return (
                        Object(r.useEffect)(function () {
                            return setTimeout(function () {
                                return n(null);
                            }, s);
                        }),
                        null === t
                            ? null
                            : Object(f.jsx)('div', {
                                  className: 'success',
                                  children: t,
                              })
                    );
                },
                v = function (e) {
                    var t = e.filterTerm,
                        n = e.setFilterTerm;
                    return Object(f.jsxs)(s.a.Fragment, {
                        children: [
                            'filter shown with',
                            ' ',
                            Object(f.jsx)('input', {
                                value: t,
                                onChange: function (e) {
                                    n(e.target.value);
                                },
                            }),
                        ],
                    });
                },
                p = function (e) {
                    var t = e.person,
                        n = e.persons,
                        r = e.setPersons,
                        c = e.setErrorMessage,
                        a = e.setSuccessMessage;
                    return Object(f.jsx)(s.a.Fragment, {
                        children: Object(f.jsxs)('p', {
                            children: [
                                t.name,
                                ' ',
                                t.number,
                                ' ',
                                Object(f.jsx)('button', {
                                    type: 'submit',
                                    onClick: function () {
                                        if (
                                            window.confirm(
                                                'Delete '.concat(t.name, '?')
                                            )
                                        ) {
                                            var e = t.id;
                                            j
                                                .deletePerson(e)
                                                .then(function () {
                                                    return a(
                                                        'Deleted '.concat(
                                                            t.name
                                                        )
                                                    );
                                                })
                                                .catch(function (e) {
                                                    return c(
                                                        'Information of '.concat(
                                                            t.name,
                                                            ' cannot be deleted as it is not found on server'
                                                        )
                                                    );
                                                }),
                                                r(
                                                    n.filter(function (t) {
                                                        return t.id !== e;
                                                    })
                                                );
                                        }
                                    },
                                    children: 'delete',
                                }),
                            ],
                        }),
                    });
                },
                g = function (e) {
                    var t = e.persons,
                        n = e.filterTerm,
                        r = e.setPersons,
                        c = e.setSuccessMessage,
                        a = e.setErrorMessage,
                        o =
                            '' === n
                                ? t
                                : t.filter(function (e) {
                                      return e.name
                                          .toLowerCase()
                                          .includes(n.toLowerCase());
                                  });
                    return Object(f.jsx)(s.a.Fragment, {
                        children: o.map(function (e) {
                            return Object(f.jsx)(
                                p,
                                {
                                    person: e,
                                    persons: t,
                                    setPersons: r,
                                    setSuccessMessage: c,
                                    setErrorMessage: a,
                                },
                                e.name
                            );
                        }),
                    });
                },
                x = function () {
                    var e = Object(r.useState)([]),
                        t = Object(o.a)(e, 2),
                        n = t[0],
                        s = t[1],
                        c = Object(r.useState)(''),
                        a = Object(o.a)(c, 2),
                        u = a[0],
                        i = a[1],
                        l = Object(r.useState)(''),
                        b = Object(o.a)(l, 2),
                        d = b[0],
                        p = b[1],
                        x = Object(r.useState)(''),
                        w = Object(o.a)(x, 2),
                        M = w[0],
                        S = w[1],
                        N = Object(r.useState)(null),
                        P = Object(o.a)(N, 2),
                        y = P[0],
                        E = P[1],
                        T = Object(r.useState)(null),
                        k = Object(o.a)(T, 2),
                        C = k[0],
                        F = k[1];
                    return (
                        Object(r.useEffect)(function () {
                            j.getAll().then(function (e) {
                                return s(e);
                            });
                        }, []),
                        Object(f.jsxs)('div', {
                            children: [
                                Object(f.jsx)('h1', { children: 'Phonebook' }),
                                Object(f.jsx)(O, {
                                    message: y,
                                    setSuccessMessage: E,
                                    delay: 5e3,
                                }),
                                Object(f.jsx)(h, {
                                    message: C,
                                    setErrorMessage: F,
                                    delay: 5e3,
                                }),
                                Object(f.jsx)(v, {
                                    filterTerm: M,
                                    setFilterTerm: S,
                                }),
                                Object(f.jsx)(m, {
                                    persons: n,
                                    setNewName: i,
                                    setNewNumber: p,
                                    setPersons: s,
                                    newName: u,
                                    newNumber: d,
                                    setSuccessMessage: E,
                                    setErrorMessage: F,
                                }),
                                Object(f.jsx)('h2', { children: 'Numbers' }),
                                Object(f.jsx)(g, {
                                    persons: n,
                                    filterTerm: M,
                                    setPersons: s,
                                    setErrorMessage: F,
                                    setSuccessMessage: E,
                                }),
                            ],
                        })
                    );
                };
            a.a.render(
                Object(f.jsx)(s.a.StrictMode, {
                    children: Object(f.jsx)(x, {}),
                }),
                document.getElementById('root')
            );
        },
    },
    [[43, 1, 2]],
]);
//# sourceMappingURL=main.38232685.chunk.js.map
