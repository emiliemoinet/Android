package com.example.takslist;

import android.content.Context;

import androidx.test.platform.app.InstrumentationRegistry;
import androidx.test.ext.junit.runners.AndroidJUnit4;

import org.junit.Test;
import org.junit.runner.RunWith;

import static org.junit.Assert.*;

/**
 * @see <a href="http://d.android.com/tools/testing"></a>
 */
@RunWith(AndroidJUnit4.class)
public class ExampleTest {
    @Test
    public void useAppContext() {
        Context appContext = InstrumentationRegistry.getInstrumentation().getTargetContext();
        assertEquals("com.example.takslist", appContext.getPackageName());
    }
}