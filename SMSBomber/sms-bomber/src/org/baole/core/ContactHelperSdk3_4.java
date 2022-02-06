package org.baole.core;

import text.androidad3.ContactHelper; 
import android.database.Cursor;
import android.provider.Contacts;

@SuppressWarnings("deprecation")
public class ContactHelperSdk3_4 extends ContactHelper {
	
	private static final String[] PEOPLE_PROJECTION = new String[] {
		Contacts.People._ID, Contacts.People.PRIMARY_PHONE_ID,
		Contacts.People.TYPE, Contacts.People.NUMBER,
		Contacts.People.LABEL, Contacts.People.NAME, };
	
	@Override
	public Cursor getContactCursor() {
		return ctx.getContentResolver().query(Contacts.People.CONTENT_URI,
				PEOPLE_PROJECTION, Contacts.People.NUMBER + " IS NOT NULL",
				null, Contacts.People.DEFAULT_SORT_ORDER);
	}

	@Override
	public String[] getFieldProjection() {
		return PEOPLE_PROJECTION;
	}

	public Cursor queryFilter(CharSequence constraint) {
		StringBuilder buffer = null;
		String[] args = null;
		
		if (constraint != null) {
			buffer = new StringBuilder();
			buffer.append("UPPER(");
			buffer.append(Contacts.ContactMethods.NAME);
			buffer.append(") GLOB ?");
			args = new String[] { constraint.toString().toUpperCase() + "*" };
		}
		
		return ctx.getContentResolver().query(Contacts.People.CONTENT_URI,
				PEOPLE_PROJECTION, buffer == null ? null : buffer
						.toString(), args,
				Contacts.People.DEFAULT_SORT_ORDER);
	}	
}