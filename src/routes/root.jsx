import { Outlet, NavLink, useLoaderData, Form, redirect, useNavigation, useSubmit } from 'react-router-dom';
import { getContacts, createContact } from '../contact';
import React, { useEffect } from 'react';

export default function Root() {
  const navigation = useNavigation();
  const data = useLoaderData();
  const { contacts, q } = data;
  const submit = useSubmit();

  const searching = navigation.location && new URLSearchParams(navigation.location.search).has(q);
  console.log(navigation.location);
  console.log(new URLSearchParams(navigation.location && navigation.location.search))

  useEffect(() => {
    document.getElementById('q').value = q;
  }, [q]);

  return (
    <>
      <div id="sidebar">
        <h1>React Router Contacts</h1>
        <div>
          <form id="search-form" role="search">
            <input
              id="q"
              className={searching ? 'loading' : ''}
              aria-label="Search contacts"
              placeholder="Search"
              type="search"
              name="q"
              defaultValue={q}
              onChange={(event) => {
                const isFirstSearch = q === null;
                submit(event.currentTarget.form, {
                  replace: !isFirstSearch
                });
              }}
            />
            <div
              id="search-spinner"
              aria-hidden
              hidden={!searching}
            />
            <div
              className="sr-only"
              aria-live="polite"
            ></div>
          </form>
          <Form method="post">
            <button type="submit">New</button>
          </Form>
        </div>
        <nav>
          {contacts.length ? (
            <ul>
              {contacts.map((contact) => (
                <li key={contact.id}>
                  <NavLink to={`contacts/${contact.id}`}
                    className={({ isActive, isPending }) => (isActive ? "active" : isPending ? "pending" : "")}>
                    {contact.first || contact.last ? (
                      <>
                        {contact.first} {contact.last}
                      </>
                    ) : (
                      <i>No Name</i>
                    )}{" "}
                    {contact.favorite && <span>★</span>}
                  </NavLink>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>No contacts</i>
            </p>
          )}
        </nav>
      </div>
      <div id="detail"
        className={
          navigation.state === 'loading' ? '' : ''
        }
      >
        <Outlet />
      </div>
    </>
  );
}

// * 获取用户
// * loader 当一进入页面的时候就会执行，返回值将是 useLoaderData 的数据
export async function loader({ request }) {
  const url = new URL(request.url);
  console.log(url);
  const q = url.searchParams.get('q');
  // console.log(args);
  const contacts = await getContacts(q);
  return { contacts, q };
}

// * 创建用户
export async function action(...args) {
  // console.log(args);
  const contact = await createContact();
  return redirect(`/contacts/${contact.id}/edit`);
}