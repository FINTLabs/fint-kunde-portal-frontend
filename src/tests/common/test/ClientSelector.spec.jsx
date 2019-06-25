import React from "react";
import { create } from "react-test-renderer";
import ClientSelector from "../../../common/test/ClientSelector";
import { shallow, mount, render } from 'enzyme';
import { Select, MenuItem, FormControl } from "@material-ui/core";



describe("Client selector", () => {
  const component = create(
    <ClientSelector
      clients={[
        {
          dn: "cn=client1",
          shortDescription: "test1",
          assetId: "test1.no"
        },
        {
          dn: "cn=client2",
          shortDescription: "test2",
          assetId: "test2.no"
        }
      ]}
      handleChange={() => {}}
      name="test"
      value="test"
    />
  );

  const wrapper = mount(
    <ClientSelector
      clients={[
        {
          dn: "cn=client1",
          shortDescription: "test1",
          assetId: "test1.no"
        },
        {
          dn: "cn=client2",
          shortDescription: "test2",
          assetId: "test2.no"
        }
      ]}
      handleChange={() => {}}
      name="test"
      value="test"
    />
  )
  //const root = component.root;
  it("should match snapshot", () => {
    expect(component.toJSON()).toMatchSnapshot();
  });

  it("asdf", () => {
    wrapper.find(FormControl).simulate('click');
    console.log(wrapper.html());
  })
});

/*
describe('<ClientSelector />', () => {
  let shallow;

  beforeAll (() => {  // This is Mocha; in Jest, use beforeAll
    //shallow = createShallow();
  });

  it('should work', () => {
    const wrapper = mount(<ClientSelector />);
  });
});
*/
